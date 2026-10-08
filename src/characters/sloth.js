const svg = require('./svg');

module.exports = {
  name: 'Sloth',
  w: 120, h: 142, grip: [60, 4], center: [60, 78], r: 66,
  rope: 'vine', gravity: 1, drag: 0.9, sway: 30, swayHz: 0.1, climb: 30,
  travel: 'slide', speed: 35, len: 150, minLen: 100, maxLen: 260, idle: [10, 22], pep: 0.3,
  svg: svg(120, 142, `
    <path d="M60 4V16" fill="none" stroke="#4f9a3d" stroke-width="5"/>
    <path d="M45 86 Q34 44 56 16" fill="none" stroke="#a08a6c" stroke-width="11"/>
    <path d="M75 86 Q86 44 64 16" fill="none" stroke="#a08a6c" stroke-width="11"/>
    <path d="M53 13l-3 -6M58 11v-7M62 11v-7M67 13l3 -6" fill="none" stroke="#5b4a36" stroke-width="2"/>
    <circle cx="46" cy="128" r="9" fill="#a08a6c"/><circle cx="74" cy="128" r="9" fill="#a08a6c"/>
    <ellipse cx="60" cy="106" rx="21" ry="26" fill="#a08a6c"/>
    <ellipse cx="60" cy="110" rx="13" ry="17" fill="#b9a586"/>
    <circle cx="60" cy="66" r="22" fill="#b39b7a"/>
    <ellipse cx="60" cy="68" rx="17" ry="14" fill="#efe4cd"/>
    <ellipse cx="51" cy="66" rx="7" ry="4.5" transform="rotate(25 51 66)" fill="#6b543c"/>
    <ellipse cx="69" cy="66" rx="7" ry="4.5" transform="rotate(-25 69 66)" fill="#6b543c"/>
    <g class="blink slow"><circle cx="52" cy="66" r="2.2" fill="#111"/><circle cx="68" cy="66" r="2.2" fill="#111"/></g>
    <ellipse cx="60" cy="72" rx="3.5" ry="2.5" fill="#5b4a36"/>
    <path d="M54 76 Q60 81 66 76" fill="none" stroke="#5b4a36" stroke-width="1.8"/>`),
};
