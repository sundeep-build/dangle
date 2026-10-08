// Putting characters on stage and taking them off.
import { MIN_LEN, EDGE } from './config.js';
import { world } from './world.js';
import { clamp, rand } from './util.js';
import { makeRope } from './ropes.js';
import { freeRight } from './layout.js';
import { wire } from './drag.js';

const stage = document.getElementById('stage');
let nextId = 1;

export function dress(c, type) {
  c.type = world.defs[type] ? type : 'hero';
  c.def = world.defs[c.type];
  c.el.innerHTML = c.def.svg;
  c.el.style.width = `${c.def.w}px`;
  c.el.style.height = `${c.def.h}px`;
  c.el.style.transformOrigin = `${c.def.grip[0]}px ${c.def.grip[1]}px`;
  c.el.classList.remove('flying');
  if (c.rope) c.rope.remove();
  c.rope = makeRope(c.def.rope);
}

export function add({ type, right, len, scale }) {
  const el = document.createElement('div');
  el.className = 'char';
  const c = { id: nextId++, el, rope: null, mode: 'hang', travel: null, vx: 0, vy: 0, rot: 0, scale: scale || 1 };
  dress(c, type);
  c.ax = clamp(world.W - (right ?? freeRight()), EDGE, world.W - EDGE);
  c.len = clamp(len ?? c.def.len, MIN_LEN, world.H - 80);
  // Starts above the screen on no rope at all, and lowers itself in.
  c.L = 0;
  c.x = c.ax;
  c.y = 0;
  c.phase = rand(0, Math.PI * 2);
  c.idleAt = world.clock + rand(3, 8);
  wire(c);
  stage.appendChild(el);
  world.chars.push(c);
  return c;
}

export function remove(c) {
  if (world.dragging === c) world.dragging = null;
  c.el.remove();
  c.rope.remove();
  world.chars.splice(world.chars.indexOf(c), 1);
}
