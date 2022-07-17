// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {contextBridge, ipcRenderer} from 'electron'
import { exposeElectronAPI } from '@electron-toolkit/preload'

exposeElectronAPI()

const ELECTRON_API = {
    getSources: () => ipcRenderer.invoke('dialog:getSources'),
    saveRecording: (args: any) => ipcRenderer.invoke('dialog:saveRecording', args).then((res) =>{
        new Notification('Recording Saved! 🎉', { body: 'Click here to see your recording' })
        .onclick = () => ipcRenderer.send('dialog:openRecording', res)
        return res
    }),
    copyToClipboard: (args: any) => ipcRenderer.invoke('dialog:copyToClipboard', args).then((res) => {
        return res
    })
}

contextBridge.exposeInMainWorld('electron', ELECTRON_API)