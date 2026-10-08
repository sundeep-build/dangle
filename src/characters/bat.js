const svg = require('./svg');

module.exports = {
  name: 'Bat',
  w: 120, h: 108, grip: [60, 4], center: [60, 56], r: 56,
  rope: 'twig', gravity: 1, drag: 0.8, sway: 40, swayHz: 0.2, climb: 100,
  travel: 'fly', len: 60, minLen: 40, maxLen: 110, idle: [8, 18], pep: 0.5,
  svg: svg(120, 108, `
    <g class="wings-open">
      <path class="flapL" d="M48 36 L6 18 Q12 34 8 46 Q22 40 26 54 Q38 46 48 56Z" fill="#3a2d57"/>
      <path class="flapR" d="M72 36 L114 18 Q108 34 112 46 Q98 40 94 54 Q82 46 72 56Z" fill="#3a2d57"/>
    </g>
    <path d="M55 6v10M65 6v10" fill="none" stroke="#3a2d57" stroke-width="3"/>
    <ellipse cx="60" cy="40" rx="15" ry="24" fill="#4a3b6b"/>
    <g class="wings-folded">
      <path d="M47 18 Q28 42 50 68 Q43 42 47 18Z" fill="#3a2d57"/>
      <path d="M73 18 Q92 42 70 68 Q77 42 73 18Z" fill="#3a2d57"/>
    </g>
    <path d="M48 84 L44 102 L58 88Z" fill="#4a3b6b"/><path d="M72 84 L76 102 L62 88Z" fill="#4a3b6b"/>
    <circle cx="60" cy="74" r="16" fill="#4a3b6b"/>
    <g class="blink">
      <circle cx="54" cy="76" r="4.5" fill="#fff"/><circle cx="66" cy="76" r="4.5" fill="#fff"/>
      <circle cx="54" cy="77" r="2.2" fill="#1b1b2a"/><circle cx="66" cy="77" r="2.2" fill="#1b1b2a"/>
    </g>
    <path d="M55 67 Q60 62 65 67" fill="none" stroke="#1b1b2a" stroke-width="1.8"/>
    <path d="M56.5 66.4l1.5 -4 1.5 3.2ZM60.5 65.6l1.5 -3.2 1.5 4Z" fill="#fff"/>`),
};
