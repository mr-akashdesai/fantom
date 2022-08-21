import { ITheme } from '../types/ITheme'

export const getTheme = (theme: string) => {
  switch (theme) {
    case ITheme.Dark:
      return 'dark'
    case ITheme.Light:
      return 'light'
    case ITheme.System:
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else {
        return 'light'
      }
    default:
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else {
        return 'light'
      }
  }
}
