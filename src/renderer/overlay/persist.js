// Reports the cast to main, which keeps it for next launch and shows it in the menus.
import { api, world } from './world.js';

let saveTimer = null;

export function saveNow() {
  clearTimeout(saveTimer);
  api.save(world.chars.map((c) => ({ type: c.type, right: Math.round(world.W - c.ax), len: Math.round(c.len), scale: c.scale })));
}

export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 400);
}
