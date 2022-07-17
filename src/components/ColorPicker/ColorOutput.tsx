/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { InputGroup, Input, Button } from 'rsuite'
const tinycolor  = require('tinycolor2')

const ColorOutput = (color: any) => {

    type ConversionTypes = 'hex' | 'rgba' | 'hsla'
    type OutputAction = 'next' | 'previous'

    const [selectedType, setSelectedType] = useState<ConversionTypes>('hex')
    const types: ConversionTypes[]= ['hex', 'rgba', 'hsla']

    const saveToClipboard = async (value: string) => {
        const res = await window.electron.copyToClipboard(value)

        if(res === 'sucesss') {
            console.log('Successfully copied to clipboard')
        }
    }

    const convertOutput = (value: string) => {
        return (
        <InputGroup className="colorPicker__colorOutputValue" >
        <Input readOnly value={value} />
            <Button onClick={() => saveToClipboard(value)}>
                <FiCopy size={'1.5rem'} />
            </Button>
        </InputGroup>
        )
    }

    const returnConversion = () => {
        const convertableColor = tinycolor(color)
        switch(selectedType) {
            case 'hex': return convertOutput(convertableColor.toHexString())
            case 'rgba': return convertOutput(convertableColor.toRgbString())
            case 'hsla': return convertOutput(convertableColor.toHslString())
        }
    }

    const changeType = (action: OutputAction) =>{
       const currentIndex = types.findIndex((value) => value === selectedType) 

       if(action === 'next') setSelectedType(types[currentIndex + 1 < types.length ? currentIndex + 1 : 0])
       if(action === 'previous') setSelectedType(types[currentIndex - 1 >= 0 ? currentIndex - 1 : 2])
    }

    return (
        <>
        <div className='colorPicker__colorOutputLabel'>
        <label>{selectedType.toUpperCase()}</label>
        </div>
        <div className="colorPicker__colorOutputContainer">
            <div className="colorPicker__colorOutputButtonGroup">
            <Button appearance="subtle" onClick={() => changeType('next')}><MdOutlineArrowDropUp size={'1.5rem'}/></Button>
            <Button appearance="subtle" onClick={() => changeType('previous')}><MdOutlineArrowDropDown size={'1.5rem'}/></Button>
            </div>
            {returnConversion()}
        </div>
        </>
    )
}

export default ColorOutput