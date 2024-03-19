// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

const api: typeof window.desktopApi = {
  logNodejs: (arg1) => ipcRenderer.send('log-nodejs', arg1),
  logBrowser: () => ipcRenderer.invoke('log-browser'),
};

contextBridge.exposeInMainWorld('desktopApi', api);
