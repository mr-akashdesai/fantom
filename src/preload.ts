// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {contextBridge, ipcRenderer} from 'electron'
import { exposeElectronAPI } from '@electron-toolkit/preload'

exposeElectronAPI()

const ELECTRON_API = {
    getSources: () => ipcRenderer.invoke('dialog:getSources'),
    selectSource: (args: any) => ipcRenderer.invoke('dialog:selectSource', args)
}

contextBridge.exposeInMainWorld('electron', ELECTRON_API)