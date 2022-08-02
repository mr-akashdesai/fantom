import { ITheme } from '../components/Settings/Types/ITheme'
import { ActionType } from './reducer'

export interface ISetThemeSetting {
  type: ActionType.setThemeSetting
  payload: ITheme
}

export const setThemeSetting = (value: ITheme): ISetThemeSetting => {
  window.electron.changeThemeSource(value)
  return {
    payload: value,
    type: ActionType.setThemeSetting,
  }
}
