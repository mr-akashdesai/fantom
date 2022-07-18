/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, clipboard, desktopCapturer, dialog, ipcMain, nativeTheme, shell } from 'electron'
import { writeFile } from 'fs'
import { ISource } from '../components/ScreenRecorder/types/ISource'
const isDev = require('electron-is-dev')
const path = require('path')
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const logosPath = path.join(__dirname, '../../src/assets/images/logo/fantom-logo-lg.png')

const createWindow = (): void => {
  
  if(process.platform === 'darwin') {
    app.dock.setIcon(logosPath)
  }
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Fantom',  
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#282C34' : '#ddd',
    height: 800,
    width: 1100,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    trafficLightPosition: { x: 10, y: 10 },
    icon: logosPath,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      devTools: isDev,
      contextIsolation: true,
      
    },
  })
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

const getvideoSources = async () => {
  const sources: ISource[] = []
  const inputSources = await desktopCapturer.getSources({types: ['window', 'screen'], fetchWindowIcons: true})

  inputSources.forEach((source) => {
    sources.push({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL()
    })
  })

  return sources
}

const saveRecording = async (args: any) => {
  const { filePath } = await dialog.showSaveDialog({
    title: args.title,
    buttonLabel: args.buttonLabel,
    defaultPath: args.defaultPath,
  })

  if (filePath) {
    writeFile(filePath, args.buffer, () => 
    console.log('video saved successfully!'))
    return filePath
  } else return null
}

const copyToClipboard = async (args: any) => {
  console.log('reached', args)
  await clipboard.writeText(args)
  return 'sucesss'
}

const openRecording = (args: any) => {
  shell.openPath(args)
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:getSources', getvideoSources)
  ipcMain.handle('dialog:saveRecording', async (event, args) => saveRecording(args))
  ipcMain.on('dialog:openRecording', async (event, args) => openRecording(args))
  ipcMain.handle('dialog:copyToClipboard', async (event, args) => copyToClipboard(args))

  createWindow
})

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.