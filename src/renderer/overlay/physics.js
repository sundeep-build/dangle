// One step of the simulation: a weight on a rope pinned to the top edge of the screen.
import { GRAVITY } from './config.js';
import { world } from './world.js';
import { clamp, turn } from './util.js';
import { travelStep, flyStep, idle } from './travel.js';

export function step(c, dt) {
  if (c.mode === 'drag') {
    turn(c, Math.atan2(c.ax - c.x, c.y), dt);
    return;
  }
  if (c.mode === 'fly') {
    flyStep(c, dt);
    return;
  }
  const def = c.def;
  if (!c.travel && world.clock > c.idleAt) idle(c);
  if (c.travel) travelStep(c, dt);

  // Climbing: the rope pays out or reels in towards the length the character wants.
  const reel = def.climb * (c.travel ? 2.2 : 1) * dt;
  c.L += clamp(c.len - c.L, -reel, reel);

  c.vy += GRAVITY * def.gravity * dt;
  c.vx += Math.sin(world.clock * def.swayHz * Math.PI * 2 + c.phase) * def.sway * dt;
  const keep = Math.exp(-def.drag * dt);
  c.vx *= keep;
  c.vy *= keep;
  c.x += c.vx * dt;
  c.y += c.vy * dt;

  // The rope only ever pulls: past its length the character is held on the arc and
  // loses whatever speed was carrying it outwards.
  const dx = c.x - c.ax;
  const dist = Math.hypot(dx, c.y);
  if (dist > c.L && dist > 0) {
    const nx = dx / dist;
    const ny = c.y / dist;
    c.x = c.ax + nx * c.L;
    c.y = ny * c.L;
    const out = c.vx * nx + c.vy * ny;
    if (out > 0) {
      c.vx -= out * nx;
      c.vy -= out * ny;
    }
  }

  // Screen edges.
  if (c.x < 20 || c.x > world.W - 20) {
    c.x = clamp(c.x, 20, world.W - 20);
    c.vx *= -0.5;
  }
  if (c.y > world.H - 20) {
    c.y = world.H - 20;
    c.vy *= -0.3;
  }

  turn(c, dist >= c.L - 2 ? Math.atan2(c.ax - c.x, c.y) : 0, dt);
}
