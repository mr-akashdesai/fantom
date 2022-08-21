import React, { useContext } from 'react'
import { Radio, RadioGroup } from 'rsuite'
import { Context } from '../../Context/context'
import { setThemeSetting } from '../../Context/dispatch'
import { ITheme } from '../../types/ITheme'

const ThemeSelector = () => {
  const { state, dispatch } = useContext(Context)

  const setTheme = (theme: ITheme) => {
    window.localStorage.setItem('theme', theme)
    dispatch(setThemeSetting(theme))
  }

  return (
    <>
      <h6>Theme:</h6>
      <br />
      <RadioGroup name='radioList' inline appearance='picker' defaultValue={state.themeSetting}>
        <Radio value={ITheme.System} onClick={() => setTheme(ITheme.System)}>
          System
        </Radio>
        <Radio value={ITheme.Light} onClick={() => setTheme(ITheme.Light)}>
          Light
        </Radio>
        <Radio value={ITheme.Dark} onClick={() => setTheme(ITheme.Dark)}>
          Dark
        </Radio>
      </RadioGroup>
    </>
  )
}

export default ThemeSelector
