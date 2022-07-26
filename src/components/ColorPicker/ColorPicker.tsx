/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import { BlockPicker } from 'react-color'
import { RgbaColorPicker } from 'react-colorful'
import { CgColorPicker } from 'react-icons/cg'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { Button } from 'rsuite'
import useEyeDropper from 'use-eye-dropper'
import Error from '../Error/Error'
import ColorOutput from './ColorOutput'
const tinycolor = require('tinycolor2')

const ColorPicker = () => {
  const { open } = useEyeDropper()
  const [color, setColor] = useState({ r: 72, g: 140, b: 129, a: 1 })
  const [colorString, setColorString] = useState('')
  const [error, setError] = useState(null)
  const [palette, setPalette] = useState([])
  const [paletteIndex, setPaletteIndex] = useState(0)
  let convertableColor

  useEffect(() => {
    const cc = tinycolor(color)
    setColorString(cc.toHexString())
  }, [color])

  const pickColor = () => {
    open()
      .then(res => {
        convertableColor = tinycolor(res.sRGBHex)
        setColor(convertableColor.toRgb())
      })
      .catch(e => {
        if (!e.canceled) setError(e)
      })
  }

  const AddToPalette = () => {
    const element = document.getElementById('palette')
    convertableColor = tinycolor(color)
    const hexString = convertableColor.toHexString()

    if (palette.length < 36 && !palette.includes(hexString)) {
      setPalette(prevState => [...prevState, hexString])
      setPaletteIndex(palette.length)
    } else {
      element.classList.add('error-shake')
      setTimeout(() => element.classList.remove('error-shake'), 300)
    }
  }

  const selectPaletteColor = (color: any) => {
    const index = palette.findIndex(val => val === color.hex)
    setPaletteIndex(index)
  }

  if (error) return <Error message={error} />

  return (
    <div className='page-container'>
      <h3>Color Picker 🎨</h3>
      <div className='colorPicker__masterContainer'>
        <div id='color-picker' className='colorPicker__colorPicker'>
          <RgbaColorPicker color={color} onChange={res => setColor(res)} />
        </div>
        <div id='palette' className='colorPicker__paletteContainer'>
          <BlockPicker
            colors={palette}
            className='colorPicker__palette'
            triangle='hide'
            onChange={color => {
              const cc = tinycolor(color.rgb)
              setColor(cc.toRgb())
            }}
            color={palette.length > 0 ? palette[paletteIndex] : color}
            onSwatchHover={value => selectPaletteColor(value)}
          />
        </div>
        <div>{ColorOutput(color)}</div>
        <div className='colorPicker__controlPanel'>
          <div className='colorPicker__buttonContainer'>
            <span style={{ backgroundColor: colorString }} className='colorPicker__colorPreview' />
            <span id='eyedropper' className='colorPicker__buttonSpace'>
              <Button onClick={() => pickColor()}>
                <CgColorPicker size={'2rem'} />
              </Button>
            </span>
            <div id='add-to-palette' className='colorPicker__buttonSpace'>
              <Button onClick={() => AddToPalette()}>
                <HiOutlineViewGridAdd size={'2rem'} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
