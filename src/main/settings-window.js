// The Dangle window, where the cast is chosen.
const { app, BrowserWindow, ipcMain } = require('electron');
const CHARACTERS = require('../characters');
const { state, events, isOn } = require('./state');
const overlay = require('./overlay');
const cast = require('./cast');
const paths = require('./paths');

let win = null; // while it is open

const snapshot = () => ({
  cast: Object.entries(CHARACTERS).map(([type, def]) => ({ type, name: def.name, svg: def.svg, on: isOn(type) })),
  roam: state.roam,
  visible: state.visible,
  openAtLogin: app.getLoginItemSettings().openAtLogin,
});

const refresh = () => win && win.webContents.send('settings:state', snapshot());

function open() {
  if (win) {
    win.show();
    win.focus();
    return;
  }
  win = new BrowserWindow({
    width: 440,
    height: 700,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    title: 'Dangle',
    icon: paths.asset('icon.png'),
    autoHideMenuBar: true,
    webPreferences: { preload: paths.preload('settings') },
  });
  win.loadFile(paths.page('settings'));
  win.on('closed', () => {
    win = null;
  });
}

function register() {
  ipcMain.handle('settings:get', snapshot);
  ipcMain.on('settings:type', (_event, { type, on }) => cast.setType(type, on));
  ipcMain.on('settings:all', (_event, on) => cast.setAll(on));
  ipcMain.on('settings:roam', (_event, on) => cast.setRoam(on));
  ipcMain.on('settings:visible', (_event, on) => overlay.setVisible(on));
  ipcMain.on('settings:home', cast.gather);
  ipcMain.on('settings:login', (_event, on) => {
    app.setLoginItemSettings({ openAtLogin: on });
    refresh();
  });
  ipcMain.on('settings:quit', () => app.quit());
  events.on('changed', refresh);
}

module.exports = { open, register };
