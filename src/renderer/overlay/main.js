// Dangle — the overlay.
// Every character is a weight on a rope pinned to the top edge of the screen. The modules
// next to this one simulate the swinging (physics), let the user drag and throw them (drag)
// and have them wander by themselves (travel); this one runs the loop and listens to main.
import { STEP, EDGE } from './config.js';
import { api, world } from './world.js';
import { clamp } from './util.js';
import { add, remove, dress } from './cast.js';
import { doTrick, goHome } from './travel.js';
import { step } from './physics.js';
import { draw, reportHit } from './render.js';
import { saveNow } from './persist.js';

let last = performance.now();
let hitAt = 0;
function frame(now) {
  const elapsed = Math.min(0.05, (now - last) / 1000);
  last = now;
  for (let left = elapsed; left > 1e-6; left -= STEP) {
    const dt = Math.min(STEP, left);
    world.clock += dt;
    for (const c of world.chars) step(c, dt);
  }
  for (const c of world.chars) draw(c);
  for (let i = world.ghosts.length - 1; i >= 0; i--) {
    const ghost = world.ghosts[i];
    ghost.life -= elapsed / 0.35;
    ghost.g.style.opacity = Math.max(0, ghost.life);
    if (ghost.life <= 0) {
      ghost.g.remove();
      world.ghosts.splice(i, 1);
    }
  }
  if (now - hitAt > 50) {
    hitAt = now;
    reportHit();
  }
  requestAnimationFrame(frame);
}

const byId = (id) => world.chars.find((c) => c.id === id);

const commands = {
  add: ({ type }) => add({ type }),
  remove: ({ id }) => byId(id) && remove(byId(id)),
  removeType: ({ type }) => world.chars.filter((c) => c.type === type).forEach(remove),
  type: ({ id, type }) => byId(id) && dress(byId(id), type),
  scale: ({ id, scale }) => {
    if (byId(id)) byId(id).scale = scale;
  },
  trick: ({ id }) => byId(id) && doTrick(byId(id)),
  home: ({ id }) => {
    if (!id) world.chars.forEach(goHome);
    else if (byId(id)) goHome(byId(id), world.chars.indexOf(byId(id)));
  },
  clear: () => [...world.chars].forEach(remove),
  roam: ({ on }) => {
    world.roam = on;
  },
};

api.onCommand((cmd) => {
  commands[cmd.op]?.(cmd);
  // Straight away, so main's idea of who is hanging is never stale when the next click comes.
  saveNow();
});

// Ropes keep their distance from the right edge when the screen changes size.
window.addEventListener('resize', () => {
  const rights = world.chars.map((c) => world.W - c.ax);
  world.W = window.innerWidth;
  world.H = window.innerHeight;
  world.chars.forEach((c, i) => {
    c.ax = clamp(world.W - rights[i], EDGE, world.W - EDGE);
    c.len = Math.min(c.len, world.H - 80);
  });
});

api.init().then((state) => {
  world.defs = state.defs;
  world.roam = state.roam;
  state.chars.forEach(add);
  requestAnimationFrame(frame);
});
