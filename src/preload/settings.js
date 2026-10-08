// Bridge for the Dangle window.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dangle', {
  // Resolves with { cast: [{ type, name, svg, on }], roam, visible, openAtLogin }.
  get: () => ipcRenderer.invoke('settings:get'),
  // The same shape again, whenever anything changes.
  onState: (callback) => ipcRenderer.on('settings:state', (_event, state) => callback(state)),
  setType: (type, on) => ipcRenderer.send('settings:type', { type, on }),
  setAll: (on) => ipcRenderer.send('settings:all', on),
  setRoam: (on) => ipcRenderer.send('settings:roam', on),
  setVisible: (on) => ipcRenderer.send('settings:visible', on),
  setLogin: (on) => ipcRenderer.send('settings:login', on),
  home: () => ipcRenderer.send('settings:home'),
  quit: () => ipcRenderer.send('settings:quit'),
});
