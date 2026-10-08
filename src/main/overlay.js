// The transparent, click-through window the characters hang in.
const { BrowserWindow, screen, ipcMain } = require('electron');
const { state, update } = require('./state');
const paths = require('./paths');

const CURSOR_POLL_MS = 40; // how often the cursor is checked against the characters

let win = null;
let clickThrough = true;
let hit = { rects: [], dragging: false }; // where the characters are, in overlay coordinates

function create() {
  win = new BrowserWindow({
    ...screen.getPrimaryDisplay().workArea,
    show: false,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    focusable: false, // never steal keyboard focus from the app the user is working in
    skipTaskbar: true,
    alwaysOnTop: true,
    acceptFirstMouse: true, // a grab should count even though the window is inactive
    webPreferences: {
      preload: paths.preload('overlay'),
      backgroundThrottling: false,
    },
  });
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true });
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(paths.page('overlay'));
  win.once('ready-to-show', () => state.visible && win.showInactive());

  ipcMain.on('overlay:hit', (_event, value) => {
    hit = value;
  });
  setInterval(pollCursor, CURSOR_POLL_MS);
  for (const change of ['display-metrics-changed', 'display-added', 'display-removed']) screen.on(change, fit);
}

function fit() {
  win.setBounds(screen.getPrimaryDisplay().workArea);
}

function setClickThrough(value) {
  if (value === clickThrough) return;
  clickThrough = value;
  win.setIgnoreMouseEvents(value, { forward: true });
}

// The overlay covers the whole screen, so it lets every click through to the apps
// underneath except while the cursor is over a character or one is being dragged.
function pollCursor() {
  if (!win.isVisible()) return;
  const cursor = screen.getCursorScreenPoint();
  const bounds = win.getBounds();
  const x = cursor.x - bounds.x;
  const y = cursor.y - bounds.y;
  const over = hit.rects.some((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h);
  setClickThrough(!(over || hit.dragging));
}

// Asks the overlay page for something; see preload/overlay.js for the commands.
const send = (cmd) => win.webContents.send('overlay:cmd', cmd);

function setVisible(value) {
  if (value) win.showInactive();
  else win.hide();
  update({ visible: value });
}

module.exports = { create, send, setVisible, window: () => win };
