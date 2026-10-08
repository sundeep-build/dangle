// Dragging, throwing, poking and the other things a mouse can do to a character.
import { MIN_LEN, EDGE, THROW_MAX } from './config.js';
import { api, world } from './world.js';
import { clamp, rand, side } from './util.js';
import { doTrick } from './travel.js';
import { save } from './persist.js';

export function wire(c) {
  const el = c.el;

  el.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    el.setPointerCapture(event.pointerId);
    c.mode = 'drag';
    c.travel = null;
    el.classList.remove('flying');
    el.classList.add('dragging');
    c.grab = { dx: c.x - event.clientX, dy: c.y - event.clientY, moved: 0 };
    c.trail = [{ x: c.x, y: c.y, t: performance.now() }];
    world.dragging = c;
  });

  el.addEventListener('pointermove', (event) => {
    if (c.mode !== 'drag') return;
    const x = clamp(event.clientX + c.grab.dx, 20, world.W - 20);
    const y = clamp(event.clientY + c.grab.dy, 10, world.H - 20);
    c.grab.moved += Math.hypot(x - c.x, y - c.y);
    c.x = x;
    c.y = y;
    // The rope's pin trails along the top so the rope never leans too far over.
    const lean = Math.max(c.y, 40) * 0.6;
    c.ax = clamp(clamp(c.ax, c.x - lean, c.x + lean), EDGE, world.W - EDGE);
    c.L = Math.max(MIN_LEN, Math.hypot(c.x - c.ax, c.y));
    const now = performance.now();
    c.trail.push({ x, y, t: now });
    while (c.trail.length > 2 && now - c.trail[0].t > 100) c.trail.shift();
  });

  const drop = () => {
    if (c.mode !== 'drag') return;
    c.mode = 'hang';
    el.classList.remove('dragging');
    world.dragging = null;
    c.len = clamp(c.L, MIN_LEN, world.H - 80);
    // Thrown with whatever speed the cursor had over the last moments of the drag.
    const first = c.trail[0];
    const last = c.trail[c.trail.length - 1];
    const dt = (last.t - first.t) / 1000;
    c.vx = dt > 0.01 ? (last.x - first.x) / dt : 0;
    c.vy = dt > 0.01 ? (last.y - first.y) / dt : 0;
    const speed = Math.hypot(c.vx, c.vy);
    if (speed > THROW_MAX) {
      c.vx *= THROW_MAX / speed;
      c.vy *= THROW_MAX / speed;
    }
    // A click without a drag is a poke.
    if (c.grab.moved < 5) c.vx += side() * 320;
    c.idleAt = world.clock + rand(c.def.idle[0], c.def.idle[1]);
    save();
  };
  el.addEventListener('pointerup', drop);
  el.addEventListener('pointercancel', drop);

  el.addEventListener('dblclick', () => doTrick(c));
  el.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    api.menu({ id: c.id, type: c.type, scale: c.scale });
  });
}
