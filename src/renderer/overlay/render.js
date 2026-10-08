// Puts each frame on screen, and tells main where the characters are.
import { api, world } from './world.js';
import { setRope, ropePath } from './ropes.js';

export function draw(c) {
  const [gx, gy] = c.def.grip;
  c.el.style.transform = `translate(${c.x - gx}px, ${c.y - gy}px) rotate(${c.rot}rad) scale(${c.scale})`;
  c.rope.style.display = c.mode === 'fly' ? 'none' : '';
  if (c.mode !== 'fly') setRope(c.rope, ropePath(c));
}

// The window lets clicks through to whatever is underneath, except over a character.
export function reportHit() {
  const rects = world.chars.map((c) => {
    const ox = (c.def.center[0] - c.def.grip[0]) * c.scale;
    const oy = (c.def.center[1] - c.def.grip[1]) * c.scale;
    const cx = c.x + ox * Math.cos(c.rot) - oy * Math.sin(c.rot);
    const cy = c.y + ox * Math.sin(c.rot) + oy * Math.cos(c.rot);
    const r = c.def.r * c.scale + 14;
    return { x: cx - r, y: cy - r, w: r * 2, h: r * 2 };
  });
  api.hit({ rects, dragging: Boolean(world.dragging) });
}
