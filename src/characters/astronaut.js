const svg = require('./svg');

module.exports = {
  name: 'Astronaut',
  w: 124, h: 146, grip: [60, 4], center: [60, 78], r: 66,
  rope: 'tether', gravity: 0.35, drag: 0.25, sway: 90, swayHz: 0.12, climb: 70,
  travel: 'slide', speed: 90, len: 220, minLen: 120, maxLen: 420, idle: [8, 16], pep: 0.5,
  svg: svg(124, 146, `
    <path d="M60 4V26" fill="none" stroke="#cfd5df" stroke-width="4"/>
    <rect x="37" y="70" width="46" height="40" rx="10" fill="#b8bfcc"/>
    <g class="dangle"><path d="M43 84 Q24 90 22 108" fill="none" stroke="#f4f6fa" stroke-width="12"/><circle cx="22" cy="108" r="7" fill="#7d8799"/></g>
    <g class="wave"><path d="M77 84 Q98 82 102 64" fill="none" stroke="#f4f6fa" stroke-width="12"/><circle cx="102" cy="64" r="7" fill="#7d8799"/></g>
    <g class="kickL"><path d="M51 112 L47 134" fill="none" stroke="#f4f6fa" stroke-width="13"/><circle cx="47" cy="135" r="7.5" fill="#7d8799"/></g>
    <g class="kickR"><path d="M69 112 L75 132" fill="none" stroke="#f4f6fa" stroke-width="13"/><circle cx="75" cy="133" r="7.5" fill="#7d8799"/></g>
    <rect x="42" y="70" width="36" height="46" rx="14" fill="#f4f6fa" stroke="#c9ced8" stroke-width="1.5"/>
    <rect x="50" y="88" width="20" height="12" rx="3" fill="#dfe4ec"/>
    <circle cx="55" cy="94" r="2" fill="#e23b3b"/><circle cx="60" cy="94" r="2" fill="#f2b400"/><circle cx="65" cy="94" r="2" fill="#3aa655"/>
    <circle cx="60" cy="50" r="26" fill="#f4f6fa" stroke="#c9ced8" stroke-width="1.5"/>
    <ellipse cx="60" cy="52" rx="19" ry="16" fill="#1f2a44"/>
    <path d="M47 47 q5 -8 14 -8" fill="none" stroke="#7fb2ff" stroke-width="3" opacity=".8"/>`),
};
