const svg = require('./svg');

module.exports = {
  name: 'Ninja',
  w: 120, h: 144, grip: [60, 4], center: [60, 78], r: 64,
  rope: 'rope', gravity: 1, drag: 0.45, sway: 50, swayHz: 0.3, climb: 220,
  travel: 'slide', speed: 260, len: 200, minLen: 90, maxLen: 420, idle: [6, 14], pep: 0.9,
  svg: svg(120, 144, `
    <path d="M60 4V30" fill="none" stroke="#c9a26b" stroke-width="4"/>
    <path d="M47 78 Q36 50 57 30" fill="none" stroke="#2b2b33" stroke-width="10"/>
    <path d="M73 78 Q84 50 63 30" fill="none" stroke="#2b2b33" stroke-width="10"/>
    <circle cx="60" cy="30" r="7" fill="#2b2b33"/>
    <path class="kickL" d="M52 106 L48 134" fill="none" stroke="#2b2b33" stroke-width="10"/>
    <path class="kickR" d="M68 106 L74 132" fill="none" stroke="#2b2b33" stroke-width="10"/>
    <rect x="45" y="70" width="30" height="40" rx="11" fill="#2b2b33"/>
    <rect x="45" y="94" width="30" height="7" fill="#d7263d"/>
    <path class="tail" d="M79 46 q14 -2 20 8 M79 48 q10 4 14 14" fill="none" stroke="#d7263d" stroke-width="4"/>
    <circle cx="60" cy="58" r="20" fill="#2b2b33"/>
    <rect x="45" y="52" width="30" height="12" rx="6" fill="#f2c9a0"/>
    <g class="blink"><circle cx="53" cy="58.5" r="2.4" fill="#1b1b2a"/><circle cx="67" cy="58.5" r="2.4" fill="#1b1b2a"/></g>
    <path d="M49 53l7 2M71 53l-7 2" fill="none" stroke="#1b1b2a" stroke-width="2"/>
    <rect x="40" y="42" width="40" height="7" rx="3" fill="#d7263d"/>`),
};
