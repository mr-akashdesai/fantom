import { nativeTheme, desktopCapturer, dialog, clipboard, shell } from 'electron'
import { writeFile } from 'fs'
import { ISource } from '../types/ISource'
import { ITheme } from '../types/ITheme'

export const changeThemeSource = (args: ITheme) => {
  nativeTheme.themeSource = args
}

export const getvideoSources = async () => {
  const sources: ISource[] = []
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    fetchWindowIcons: true
  })

  inputSources.forEach(source => {
    sources.push({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL()
    })
  })

  return sources
}

export const saveRecording = async (args: any) => {
  const { filePath } = await dialog.showSaveDialog({
    title: args.title,
    buttonLabel: args.buttonLabel,
    defaultPath: args.defaultPath
  })

  if (filePath) {
    writeFile(filePath, args.buffer, () => console.log('video saved successfully!'))
    return filePath
  } else return null
}

export const copyToClipboard = async (args: any) => {
  await clipboard.writeText(args)
  return 'sucesss'
}

export const openRecording = (args: any) => {
  shell.openPath(args)
}
