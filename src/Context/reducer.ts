import { ISetThemeSetting } from './dispatch'
import { IContext } from './IContext'

export enum ActionType {
  setThemeSetting,
}

export type Actions = ISetThemeSetting

export const Reducer = (state: IContext, action: Actions): IContext => {
  switch (action.type) {
    case ActionType.setThemeSetting:
      state.themeSetting = action.payload
      return state
    default:
      return state
  }
}
