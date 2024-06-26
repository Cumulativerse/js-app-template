import { app, BrowserWindow, ipcMain } from 'electron';
import express from 'express';
import path from 'path';

const distDir = path.join(__dirname, '../dist');
const DEV_SERVER_URL = 'http://localhost:3000/';

let win: BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 1280,
    height: 720,
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (!app.isPackaged) {
    // Development mode
    win.loadURL(DEV_SERVER_URL);
    win.webContents.openDevTools(); // Open the DevTools.
  } else {
    // Production mode
    const server = express();
    server.use(express.static(distDir));
    server.listen(5000, () => {
      win?.loadURL('http://localhost:5000');
    });
    // win.loadFile(path.join(distDir, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on(
    'log-nodejs',
    (event, ...args: Parameters<typeof window.desktopApi.logNodejs>) => {
      console.log('Received browser arguments: ', ...args);
    },
  );

  ipcMain.handle('log-browser', () => 'Hello from main process!');
  createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
