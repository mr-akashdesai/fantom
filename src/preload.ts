// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {contextBridge, ipcRenderer} from 'electron'
import { exposeElectronAPI } from '@electron-toolkit/preload'

exposeElectronAPI()

const ELECTRON_API = {
    getSources: () => ipcRenderer.invoke('dialog:getSources'),
    showSaveDialog: (args: any) => ipcRenderer.invoke('dialog:showSaveDialog', args).then((res) =>{
        console.log('api.showSaveDialog:', res)
        return res
    }),
    saveRecording: (args: any) => ipcRenderer.invoke('dialog:saveRecording', args).then((res) =>{
        console.log('api.saveRecording:', res)
        return res
    }),
}

contextBridge.exposeInMainWorld('electron', ELECTRON_API)