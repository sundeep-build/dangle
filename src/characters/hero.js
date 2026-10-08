const svg = require('./svg');

module.exports = {
  name: 'Web Hero',
  w: 120, h: 144, grip: [60, 4], center: [60, 78], r: 64,
  rope: 'web', gravity: 1, drag: 0.35, sway: 60, swayHz: 0.25, climb: 140,
  travel: 'swing', len: 240, minLen: 110, maxLen: 460, idle: [5, 12], pep: 1,
  svg: svg(120, 144, `
    <path d="M52 62 L32 40 L54 18" fill="none" stroke="#24357a" stroke-width="11"/>
    <path d="M68 62 L88 40 L66 18" fill="none" stroke="#24357a" stroke-width="11"/>
    <ellipse cx="54" cy="15" rx="8" ry="6" fill="#e23b3b"/>
    <ellipse cx="66" cy="15" rx="8" ry="6" fill="#e23b3b"/>
    <rect x="44" y="54" width="32" height="40" rx="12" fill="#e23b3b"/>
    <rect x="44" y="54" width="32" height="11" rx="5.5" fill="#24357a"/>
    <circle cx="60" cy="78" r="3.5" fill="#1b1b2a"/>
    <path d="M60 71v14M55 75l-5-4M65 75l5-4M55 81l-5 4M65 81l5 4" fill="none" stroke="#1b1b2a" stroke-width="2"/>
    <path d="M60 4V58" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M47 88 Q30 74 57 59" fill="none" stroke="#e23b3b" stroke-width="9"/>
    <path d="M73 88 Q90 74 63 59" fill="none" stroke="#e23b3b" stroke-width="9"/>
    <circle cx="60" cy="58" r="6.5" fill="#24357a"/>
    <circle cx="60" cy="116" r="22" fill="#e23b3b"/>
    <path d="M57 112 Q44 107 42 122 Q53 128 57 112Z" fill="#fff" stroke="#1b1b2a" stroke-width="2.5"/>
    <path d="M63 112 Q76 107 78 122 Q67 128 63 112Z" fill="#fff" stroke="#1b1b2a" stroke-width="2.5"/>`),
};
