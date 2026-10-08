const svg = require('./svg');

module.exports = {
  name: 'Monkey',
  w: 124, h: 146, grip: [60, 4], center: [62, 80], r: 66,
  rope: 'vine', gravity: 1, drag: 0.3, sway: 70, swayHz: 0.3, climb: 140,
  travel: 'swing', len: 170, minLen: 100, maxLen: 380, idle: [4, 10], pep: 1.2,
  svg: svg(124, 146, `
    <path d="M60 4V22" fill="none" stroke="#4f9a3d" stroke-width="5"/>
    <path d="M50 86 Q32 52 59 22" fill="none" stroke="#8a5a3b" stroke-width="10"/>
    <circle cx="60" cy="22" r="7" fill="#8a5a3b"/>
    <path class="tail" d="M72 112 Q104 118 100 94 Q98 82 108 82" fill="none" stroke="#8a5a3b" stroke-width="5"/>
    <path d="M52 116 Q42 128 50 138" fill="none" stroke="#8a5a3b" stroke-width="9"/>
    <path d="M68 116 Q80 128 72 138" fill="none" stroke="#8a5a3b" stroke-width="9"/>
    <ellipse cx="60" cy="100" rx="18" ry="21" fill="#8a5a3b"/>
    <ellipse cx="60" cy="103" rx="11" ry="14" fill="#f0c9a0"/>
    <path class="dangle" d="M74 90 Q92 98 88 116" fill="none" stroke="#8a5a3b" stroke-width="9"/>
    <circle cx="38" cy="58" r="9" fill="#8a5a3b"/><circle cx="38" cy="58" r="5" fill="#f0c9a0"/>
    <circle cx="82" cy="58" r="9" fill="#8a5a3b"/><circle cx="82" cy="58" r="5" fill="#f0c9a0"/>
    <circle cx="60" cy="60" r="21" fill="#8a5a3b"/>
    <ellipse cx="60" cy="65" rx="15" ry="12" fill="#f0c9a0"/>
    <circle cx="53" cy="57" r="8" fill="#f0c9a0"/><circle cx="67" cy="57" r="8" fill="#f0c9a0"/>
    <g class="blink"><circle cx="53" cy="57" r="2.6" fill="#1b1b2a"/><circle cx="67" cy="57" r="2.6" fill="#1b1b2a"/></g>
    <circle cx="58" cy="64" r="1" fill="#5b3a25"/><circle cx="62" cy="64" r="1" fill="#5b3a25"/>
    <path d="M52 68 Q60 76 68 68" fill="none" stroke="#5b3a25" stroke-width="2"/>`),
};
