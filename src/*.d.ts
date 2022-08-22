import { ELECTRON_API } from './electron/preload'

declare global {
  interface Window {
    electron: typeof ELECTRON_API
  }
}
