import produce from 'immer'
import React from 'react'
import { ITheme } from '../components/Settings/Types/ITheme'
import { IContext } from './IContext'
import { Actions } from './reducer'

export const initialContext: IContext = {
    themeSetting: ITheme.System,
}

export const Context = React.createContext<{
  state: IContext,
  dispatch: React.Dispatch<Actions>,
}>
  ({
    dispatch: () => undefined,
    state: initialContext,
  })

export const useImmerReducer = (reducer: any, initialState: IContext) : any=> {
  return React.useReducer(produce(reducer), initialState)
}
