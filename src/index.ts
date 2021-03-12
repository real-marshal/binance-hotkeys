import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
/*
  electron-forge uses webpack.DefinePlugin to construct this constant

  MAIN_WINDOW is a capitilized snake case string from package.json
  config.forge.plugins[0][1].renderer.entryPoints[0].name

  WEBPACK_ENTRY is a constant suffix
*/
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

const BROWSER_WINDOW_CONFIG: BrowserWindowConstructorOptions = {
  height: 600,
  width: 800,
  frame: false,
  alwaysOnTop: process.env.NODE_ENV === 'production' && true,
  backgroundColor: '#111',
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow(BROWSER_WINDOW_CONFIG)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
