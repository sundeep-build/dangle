// Ropes are drawn in one full-screen <svg> underneath the characters.
const NS = 'http://www.w3.org/2000/svg';
const ropes = document.getElementById('ropes');

export function makeRope(kind) {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', `rope rope-${kind}`);
  for (const layer of ['shadow', 'core', 'detail']) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('class', layer);
    g.appendChild(path);
  }
  ropes.appendChild(g);
  return g;
}

export function setRope(g, d) {
  for (const path of g.children) path.setAttribute('d', d);
}

// A taut rope is a straight line; a slack one sags by however much rope is spare.
export function ropePath(c) {
  const dist = Math.hypot(c.x - c.ax, c.y);
  if (c.mode === 'drag' || dist >= c.L - 1) return `M${c.ax} 0L${c.x} ${c.y}`;
  const sag = Math.sqrt(c.L * c.L - dist * dist) * 0.5;
  return `M${c.ax} 0Q${(c.ax + c.x) / 2} ${c.y / 2 + sag} ${c.x} ${c.y}`;
}
