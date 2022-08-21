import React from 'react'
import produce from 'immer'
import { ITheme } from '../types/ITheme'
import { IContext } from './IContext'
import { Actions } from './reducer'

const storedTheme = window.localStorage.getItem('theme') as ITheme

export const initialContext: IContext = {
  themeSetting: storedTheme ? storedTheme : ITheme.System
}

export const Context = React.createContext<{
  state: IContext
  dispatch: React.Dispatch<Actions>
}>({
  dispatch: () => undefined,
  state: initialContext
})

export const useImmerReducer = (reducer: any, initialState: IContext): any => {
  return React.useReducer(produce(reducer), initialState)
}
