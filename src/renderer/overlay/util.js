export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const rand = (lo, hi) => lo + Math.random() * (hi - lo);
export const side = () => (Math.random() < 0.5 ? -1 : 1);

// Eases a character's rotation towards `target`, the short way round.
export function turn(c, target, dt) {
  const diff = Math.atan2(Math.sin(target - c.rot), Math.cos(target - c.rot));
  c.rot += diff * Math.min(1, 12 * dt);
}
