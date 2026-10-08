// Draws the app and tray icons into assets/. Only needed again if the artwork below changes.
// Run with Electron, not Node:  npx electron scripts/make-icons.js
// (inside an editor's terminal, unset ELECTRON_RUN_AS_NODE first)
const { app, BrowserWindow } = require('electron');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const CHARACTERS = require('../src/characters');

const assets = path.join(__dirname, '..', 'assets');
const spider = CHARACTERS.spider.svg.replace(/^<svg[^>]*>|<\/svg>$/g, '');

const APP_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#3a2a8c"/>
    </linearGradient></defs>
    <rect x="28" y="28" width="456" height="456" rx="104" fill="url(#sky)"/>
    <path d="M256 28V150" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <g transform="translate(46 118) scale(3.5)" stroke-linecap="round">${spider}</g>
  </svg>`;

// One flat colour: macOS recolours a "Template" image to suit the menu bar.
const trayIcon = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round">
    <path d="M16 1V11"/>
    <path d="M10 15Q5 11 3 15M9.5 19Q4 19 2 23M11 22Q7 25 7 29M22 15Q27 11 29 15M22.5 19Q28 19 30 23M21 22Q25 25 25 29"/>
    <circle cx="16" cy="18" r="7" fill="${color}" stroke="none"/>
  </svg>`;

async function render(svg, size) {
  const win = new BrowserWindow({ width: size, height: size, show: false, frame: false, transparent: true, webPreferences: { offscreen: true } });
  const page = `<body style="margin:0;overflow:hidden;background:transparent">${svg}</body>`;
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(page)}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  const image = await win.webContents.capturePage();
  win.destroy();
  return image;
}

const png = (image, size) => image.resize({ width: size, height: size, quality: 'best' }).toPNG();

// A .ico may simply wrap a PNG.
function ico(pngData) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(pngData.length, 14);
  header.writeUInt32LE(22, 18); // offset of the image data; width and height 0 mean 256
  return Buffer.concat([header, pngData]);
}

// Windows come and go below; the app quits itself when it is done.
app.on('window-all-closed', () => {});

app.whenReady().then(async () => {
  fs.mkdirSync(assets, { recursive: true });
  const icon = await render(APP_ICON, 1024);
  fs.writeFileSync(path.join(assets, 'icon.png'), png(icon, 1024));
  fs.writeFileSync(path.join(assets, 'icon.ico'), ico(png(icon, 256)));

  const template = await render(trayIcon('#000'), 32);
  fs.writeFileSync(path.join(assets, 'trayTemplate.png'), png(template, 16));
  fs.writeFileSync(path.join(assets, 'trayTemplate@2x.png'), png(template, 32));
  fs.writeFileSync(path.join(assets, 'tray.png'), png(await render(trayIcon('#7c5cff'), 32), 32));

  if (process.platform === 'darwin') {
    const set = path.join(assets, 'icon.iconset');
    fs.mkdirSync(set, { recursive: true });
    for (const size of [16, 32, 128, 256, 512]) {
      fs.writeFileSync(path.join(set, `icon_${size}x${size}.png`), png(icon, size));
      fs.writeFileSync(path.join(set, `icon_${size}x${size}@2x.png`), png(icon, size * 2));
    }
    execFileSync('iconutil', ['-c', 'icns', set, '-o', path.join(assets, 'icon.icns')]);
    fs.rmSync(set, { recursive: true });
  }
  app.quit();
});
