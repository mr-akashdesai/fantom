import React, { useEffect, useState } from 'react'

const Calculator = () => {

    const [value, setValue] = useState(null)
    const [displayValue, setDisplayValue] = useState('0')
    const [operator, setOperator] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])



    const CalculatorOperations = (operator: string, currentValue: number, inputValue: number ) => {
        switch(operator) {
            case '/':  return currentValue / inputValue
            case '*': return currentValue * inputValue
            case '+': return currentValue + inputValue
            case '-': return currentValue - inputValue
            case '=': return inputValue
        }
    }

    const CalculatorDisplay = ( disValue: string ) => {        
        return (
        <div className='calculator-display'>
            {disValue}
        </div>
        )
    }

    interface CalculatorKeyProps {
        onClick: any
        className: string
        value: string
    }

    const CalculatorKey: React.FC<CalculatorKeyProps> = ({onClick, className, value}) => 
        <button onClick={onClick} className={`calculator-key ${className}`}>{value}</button>
    
    const clearAll = () => {
        setValue(null)
        setDisplayValue('0')
        setOperator(null)
        setWaitingForOperand(false)
    }
        
    const clearDisplay = () => setDisplayValue('0')
    
    const clearLastChar = () => setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0')

    const toggleSign = () => {
        const newValue = parseFloat(displayValue) * -1
        setDisplayValue(String(newValue))
    }
    
    const inputPercent = () => {
        const currentValue = parseFloat(displayValue)
        
        if (currentValue === 0)
        return
        
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
        const newValue = parseFloat(displayValue) / 100
        
        setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)))
    }
    
    const inputDot = () => {
        if (!(/\./).test(displayValue)) {
            setDisplayValue(displayValue + '.')
            setWaitingForOperand(false)
        }
    }
    
    const inputDigit = (digit: string | number) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit))
            setWaitingForOperand(false)
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
        }
    }
    
    const performOperation = (nextOperator: string) => {    
        const inputValue = parseFloat(displayValue)
        
        if (value == null) {
            setValue(inputValue)
        } else if (operator) {
        const currentValue = value || 0
        const newValue = CalculatorOperations(operator, currentValue, inputValue)

        setValue(newValue)
        setDisplayValue(String(newValue))
        }
        
        setWaitingForOperand(true)
        setOperator(nextOperator)
    }
    
  const handleKeyDown = (event: { preventDefault?: any; key?: any }) => {
    let { key } = event
    
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      inputDot()
    } else if (key === '%') {
      event.preventDefault()
      inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (displayValue !== '0') {
        clearDisplay()
      } else {
        clearAll()
      }
    }
  }
  
    const clearDisplayBool = displayValue !== '0'
    
    return (
    <div className='page-container'>
        <h2 className='calculator__title'>Calculator</h2>
      <div className='calculator'>
        {CalculatorDisplay(displayValue)}
        <div className='calculator-keypad'>
          <div className='input-keys'>
            <div className='function-keys'>
              <CalculatorKey className='key-clear' onClick={() => clearDisplayBool ? clearDisplay() : clearAll()} value={'AC'}/>
              <CalculatorKey className='key-sign' onClick={() => toggleSign()} value={'±'}/>
              <CalculatorKey className='key-percent' onClick={() => inputPercent()} value={'%'}/>
            </div>
            <div className='digit-keys'>
              <CalculatorKey className='key-0' onClick={() => inputDigit(0)} value={'0'}/>
              <CalculatorKey className='key-dot' onClick={() => inputDot()} value={'●'} />
              <CalculatorKey className='key-1' onClick={() => inputDigit(1)} value={'1'} />
              <CalculatorKey className='key-2' onClick={() => inputDigit(2)} value={'2'} />
              <CalculatorKey className='key-3' onClick={() => inputDigit(3)} value={'3'} />
              <CalculatorKey className='key-4' onClick={() => inputDigit(4)} value={'4'} />
              <CalculatorKey className='key-5' onClick={() => inputDigit(5)} value={'5'} />
              <CalculatorKey className='key-6' onClick={() => inputDigit(6)} value={'6'} />
              <CalculatorKey className='key-7' onClick={() => inputDigit(7)} value={'7'} />
              <CalculatorKey className='key-8' onClick={() => inputDigit(8)} value={'8'} />
              <CalculatorKey className='key-9' onClick={() => inputDigit(9)} value={'9'} />
            </div>
          </div>
          <div className='operator-keys'>
            <CalculatorKey className='key-divide' onClick={() => performOperation('/')} value={'÷'}/>
            <CalculatorKey className='key-multiply' onClick={() => performOperation('*')} value={'x'}/>
            <CalculatorKey className='key-subtract' onClick={() => performOperation('-')} value={'-'}/>
            <CalculatorKey className='key-add' onClick={() => performOperation('+')} value={'+'}/>
            <CalculatorKey className='key-equals' onClick={() => performOperation('=')} value={'='}/>
          </div>
        </div>
        </div>
      </div>
    )
  }

export default Calculator