# Dangle

Little characters that hang from the top of your screen, sway, and swing around while you work.
Runs on macOS and Windows.

The cast: Web Hero, Ninja, Monkey, Astronaut, Bat, Sloth and Little Spider. They start in the
top right and stay on top of your other windows; clicks anywhere else pass straight through.

## Playing with them

| Do this | What happens |
| --- | --- |
| Drag a character | Move it anywhere. Drag lower for a longer rope. |
| Let go while moving | It is thrown, and swings from wherever its rope is pinned. |
| Click | A poke. |
| Double-click | A trick: it crosses the screen its own way (swinging rope to rope, sliding, or flying). |
| Right-click | Change character or size, add another, send it back to the top right, remove it. |

## Choosing who hangs

Dangle opens a small window with a switch for every character: turn on only the ones you want,
or use **Show all** and **Remove all**. The same window has wandering on/off, hide for now,
gather in the top right, **Open at login** and **Quit**.

Closing the window leaves the characters hanging. Bring it back from the Dock or taskbar icon,
by launching Dangle again, or from the tray icon (menu bar on macOS, system tray on Windows),
which has the same switches.

Positions and the cast are remembered between launches.

## Run from source

```
npm install
npm start
```

## Build the apps

```
npm run build:mac   # dist/Dangle-darwin-universal/Dangle.app
npm run build:win   # dist/Dangle-win32-x64/Dangle.exe
```

Both can be built from a Mac. The builds are not signed with a developer certificate, so the
first launch needs "Open anyway" on macOS (right-click the app, Open) and "More info, Run anyway"
on Windows.

## Project layout

```
assets/                  app and tray icons
scripts/                 start.js (run from source), make-icons.js (redraw the icons)
src/
  characters/            one file per character, plus index.js, the list of them
  main/                  the main process
    index.js               entry: starts everything
    state.js               what is remembered between launches; announces changes
    overlay.js             the transparent click-through window
    settings-window.js     the Dangle window
    cast.js                add / remove / show all: actions every menu shares
    menus.js               tray menu and the right-click menu
    paths.js               where files live
  preload/               the bridge each window gets (overlay.js, settings.js)
  renderer/
    overlay/             the characters on screen
      main.js              frame loop, commands from main
      physics.js           the swinging
      travel.js            crossing the screen, idle behaviour
      drag.js              mouse handling
      cast.js, ropes.js, render.js, layout.js, persist.js, world.js, config.js, util.js
    settings/            the Dangle window's page
```

Main owns the saved state and is the only thing that talks to both windows. Anything that
changes the state goes through `update()` in [state.js](src/main/state.js), and the tray and
the Dangle window redraw from its `changed` event, so a new control only has to call an action
in [cast.js](src/main/cast.js).

## Adding a character

1. Copy a file in [src/characters/](src/characters/), for example [spider.js](src/characters/spider.js):
   an SVG drawn hanging straight down, the point where the rope attaches (`grip`), a rope style,
   and a few numbers for how it moves. The fields are described in [index.js](src/characters/index.js).
2. Add it to the list in [index.js](src/characters/index.js).

It then shows up in the Dangle window and every menu by itself. A new rope look is a few lines
in [src/renderer/overlay/styles.css](src/renderer/overlay/styles.css).
