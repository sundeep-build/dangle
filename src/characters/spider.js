const svg = require('./svg');

module.exports = {
  name: 'Little Spider',
  w: 120, h: 90, grip: [60, 4], center: [60, 48], r: 52,
  rope: 'silk', gravity: 1, drag: 0.5, sway: 60, swayHz: 0.35, climb: 260,
  travel: 'slide', speed: 140, len: 180, minLen: 60, maxLen: 520, idle: [4, 10], pep: 0.8,
  svg: svg(120, 90, `
    <path d="M60 4V28" fill="none" stroke="#fff" stroke-width="1.5"/>
    <g class="legsL" fill="none" stroke="#2e2e3a" stroke-width="4">
      <path d="M44 40 Q26 28 16 40"/><path d="M42 46 Q22 42 12 56"/><path d="M43 52 Q26 58 20 72"/><path d="M47 58 Q36 70 36 82"/>
    </g>
    <g class="legsR" fill="none" stroke="#2e2e3a" stroke-width="4">
      <path d="M76 40 Q94 28 104 40"/><path d="M78 46 Q98 42 108 56"/><path d="M77 52 Q94 58 100 72"/><path d="M73 58 Q84 70 84 82"/>
    </g>
    <circle cx="60" cy="46" r="21" fill="#2e2e3a"/>
    <g class="blink">
      <circle cx="52" cy="44" r="7" fill="#fff"/><circle cx="68" cy="44" r="7" fill="#fff"/>
      <circle cx="53" cy="46" r="3.2" fill="#111"/><circle cx="67" cy="46" r="3.2" fill="#111"/>
    </g>
    <circle cx="45" cy="55" r="3" fill="#ff8fa3" opacity=".7"/><circle cx="75" cy="55" r="3" fill="#ff8fa3" opacity=".7"/>
    <path d="M55 57 Q60 61 65 57" fill="none" stroke="#fff" stroke-width="1.8"/>`),
};
