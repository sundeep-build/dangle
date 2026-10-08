// The tray item and the menu a right-click on a character opens.
const { app, Tray, Menu, nativeImage } = require('electron');
const CHARACTERS = require('../characters');
const { state, events, isOn } = require('./state');
const overlay = require('./overlay');
const cast = require('./cast');
const settingsWindow = require('./settings-window');
const paths = require('./paths');

const SIZES = [
  ['Small', 0.7],
  ['Medium', 1],
  ['Large', 1.4],
];

let tray = null;

// One entry per character; with `current`, a radio list with that one ticked.
const castMenu = (onPick, current) =>
  Object.entries(CHARACTERS).map(([type, def]) => ({
    label: def.name,
    type: current ? 'radio' : 'normal',
    checked: type === current,
    click: () => onPick(type),
  }));

function refreshTray() {
  const menu = Menu.buildFromTemplate([
    { label: 'Open Dangle…', click: settingsWindow.open },
    { type: 'separator' },
    ...Object.entries(CHARACTERS).map(([type, def]) => ({
      label: def.name,
      type: 'checkbox',
      checked: isOn(type),
      click: (item) => cast.setType(type, item.checked),
    })),
    { type: 'separator' },
    { label: 'Show all', click: () => cast.setAll(true) },
    { label: 'Remove all', click: () => cast.setAll(false) },
    { label: 'Gather in the top right', click: cast.gather },
    { type: 'separator' },
    { label: 'Wander around', type: 'checkbox', checked: state.roam, click: (item) => cast.setRoam(item.checked) },
    { label: 'Hide for now', type: 'checkbox', checked: !state.visible, click: (item) => overlay.setVisible(!item.checked) },
    { type: 'separator' },
    {
      label: 'Open at login',
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin,
      click: (item) => app.setLoginItemSettings({ openAtLogin: item.checked }),
    },
    { label: 'Quit Dangle', click: () => app.quit() },
  ]);
  tray.setContextMenu(menu);
}

function createTray() {
  const file = process.platform === 'darwin' ? 'trayTemplate.png' : 'tray.png';
  tray = new Tray(nativeImage.createFromPath(paths.asset(file)));
  tray.setToolTip('Dangle');
  refreshTray();
  events.on('changed', refreshTray);
}

// Right-click on a character: { id, type, scale }.
function popupCharacterMenu({ id, type, scale }) {
  const send = overlay.send;
  Menu.buildFromTemplate([
    { label: CHARACTERS[type].name, enabled: false },
    { label: 'Do a trick', click: () => send({ op: 'trick', id }) },
    { label: 'Go back to the top right', click: () => send({ op: 'home', id }) },
    { type: 'separator' },
    { label: 'Change into', submenu: castMenu((to) => send({ op: 'type', id, type: to }), type) },
    {
      label: 'Size',
      submenu: SIZES.map(([label, value]) => ({
        label,
        type: 'radio',
        checked: value === scale,
        click: () => send({ op: 'scale', id, scale: value }),
      })),
    },
    { label: 'Add another', submenu: castMenu(cast.add) },
    { type: 'separator' },
    { label: 'Remove', click: () => send({ op: 'remove', id }) },
  ]).popup({ window: overlay.window() });
}

module.exports = { createTray, popupCharacterMenu };
