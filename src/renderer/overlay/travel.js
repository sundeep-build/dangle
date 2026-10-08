// Getting around: crossing the screen, and what a character does when left alone.
import { MIN_LEN, EDGE } from './config.js';
import { world } from './world.js';
import { clamp, rand, side, turn } from './util.js';
import { makeRope, setRope, ropePath } from './ropes.js';
import { homeRight, maxLen } from './layout.js';
import { save } from './persist.js';

export function startTravel(c, target) {
  target = clamp(target, EDGE, world.W - EDGE);
  if (c.mode !== 'hang' || Math.abs(target - c.ax) < 20) return;
  const dir = Math.sign(target - c.ax);
  if (c.def.travel === 'fly') {
    c.mode = 'fly';
    c.fly = { x0: c.x, y0: c.y, x1: target, t: 0, dur: clamp(Math.abs(target - c.x) / 420, 0.9, 3) };
    c.ax = target;
    c.el.classList.add('flying');
  } else if (c.def.travel === 'swing') {
    c.travel = { kind: 'swing', target, dir, age: 0, hops: 0 };
    throwRope(c);
  } else {
    c.travel = { kind: 'slide', target };
  }
}

// Lets go of the current rope and catches a new one further along.
export function throwRope(c) {
  const tr = c.travel;
  const reach = c.len * 0.9 + 60;
  const ghost = makeRope(c.def.rope);
  setRope(ghost, ropePath(c));
  world.ghosts.push({ g: ghost, life: 1 });
  c.ax = Math.abs(tr.target - c.x) <= reach ? tr.target : c.x + tr.dir * reach;
  c.L = clamp(Math.hypot(c.x - c.ax, c.y), MIN_LEN, world.H - 60);
  c.vx += tr.dir * 220;
  tr.age = 0;
  tr.hops += 1;
}

export function travelStep(c, dt) {
  const tr = c.travel;
  if (tr.kind === 'slide') {
    const left = tr.target - c.ax;
    const move = c.def.speed * dt;
    if (Math.abs(left) <= move) {
      c.ax = tr.target;
      c.travel = null;
      save();
    } else {
      c.ax += Math.sign(left) * move;
    }
    return;
  }
  // Swinging: once past the low point and either well up the far side or running out
  // of speed, it is time for the next rope.
  tr.age += dt;
  const ahead = tr.dir * (c.x - c.ax);
  const stalling = ahead > 0 && tr.dir * c.vx < 30;
  if (ahead > 0.45 * c.L || stalling || tr.age > 5) {
    if (Math.abs(tr.target - c.ax) < 1 || tr.hops >= 12) {
      c.travel = null;
      save();
    } else {
      throwRope(c);
    }
  }
}

export function flyStep(c, dt) {
  const f = c.fly;
  f.t = Math.min(1, f.t + dt / f.dur);
  const e = f.t * f.t * (3 - 2 * f.t);
  c.x = f.x0 + (f.x1 - f.x0) * e;
  c.y = f.y0 + (c.len - f.y0) * e + Math.sin(Math.PI * e) * Math.min(160, world.H * 0.2) + Math.sin(f.t * f.dur * 14) * 6;
  // Right way up in the air, flipping back over to land.
  turn(c, f.t < 0.85 ? Math.PI : 0, dt);
  if (f.t >= 1) {
    c.mode = 'hang';
    c.L = c.len;
    c.vx = c.vy = 0;
    c.el.classList.remove('flying');
    save();
  }
}

export function doTrick(c) {
  if (c.mode !== 'hang') return;
  c.travel = null;
  // Somewhere at least a third of the screen away.
  const far = c.ax < world.W / 2 ? rand(c.ax + world.W / 3, world.W - EDGE) : rand(EDGE, c.ax - world.W / 3);
  startTravel(c, far);
}

export function goHome(c, slot) {
  if (c.mode !== 'hang') return;
  c.travel = null;
  c.len = clamp(c.def.len, MIN_LEN, maxLen(c));
  startTravel(c, world.W - homeRight(slot));
  save();
}

export function idle(c) {
  c.idleAt = world.clock + rand(c.def.idle[0], c.def.idle[1]);
  const pick = Math.random();
  if (!world.roam || pick < 0.45) {
    c.vx += side() * rand(120, 320) * c.def.pep;
  } else if (pick < 0.7) {
    c.len = rand(Math.min(c.def.minLen, maxLen(c)), maxLen(c));
    save();
  } else {
    startTravel(c, rand(EDGE, world.W - EDGE));
  }
}
