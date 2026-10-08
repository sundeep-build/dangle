// Dangle — main process entry: starts everything and connects the overlay page to it.
const { app, ipcMain } = require('electron');
const CHARACTERS = require('../characters');
const { state, load, update } = require('./state');
const overlay = require('./overlay');
const settingsWindow = require('./settings-window');
const menus = require('./menus');

ipcMain.handle('overlay:init', () => ({ defs: CHARACTERS, chars: state.chars, roam: state.roam }));
// The overlay reports the cast after every change; it is kept for next launch.
ipcMain.on('overlay:save', (_event, chars) => update({ chars }));
ipcMain.on('overlay:menu', (_event, info) => menus.popupCharacterMenu(info));

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.whenReady().then(() => {
    load();
    overlay.create();
    settingsWindow.register();
    menus.createTray();
    settingsWindow.open();
  });

  // Launching again, or clicking the Dock icon, brings the Dangle window back.
  app.on('second-instance', () => overlay.window() && settingsWindow.open());
  app.on('activate', () => overlay.window() && settingsWindow.open());
  // Closing the Dangle window leaves the characters hanging; the tray item quits.
  app.on('window-all-closed', () => {});
}
