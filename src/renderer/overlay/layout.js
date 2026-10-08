// Where characters belong: the home slots along the top right, and how far down they may hang.
import { MIN_LEN, HOME_RIGHT, HOME_GAP, HOME_SLOTS } from './config.js';
import { world } from './world.js';

export function maxLen(c) {
  return Math.max(MIN_LEN, Math.min(c.def.maxLen, world.H - 140));
}

export const homeRight = (slot) => HOME_RIGHT + (slot % HOME_SLOTS) * HOME_GAP;

// The first home slot nobody is hanging in, so a newcomer does not land on top of someone.
export function freeRight() {
  for (let slot = 0; slot < HOME_SLOTS; slot++) {
    const x = world.W - homeRight(slot);
    if (!world.chars.some((c) => Math.abs(c.ax - x) < HOME_GAP / 2)) return homeRight(slot);
  }
  return homeRight(world.chars.length);
}
