// The cast, in menu order. To add a character, write its file next to this one and list it here.
// The main process owns this registry and hands it to the windows that need it.
//
// Each character is drawn hanging straight down, with its rope arriving from directly above
// at `grip`, and describes itself with:
//
//   name      shown in the menus
//   w, h      size of the drawing
//   svg       the drawing
//   grip      where the rope attaches, in the drawing's own coordinates
//   center,r  a circle around the body, used to tell when the cursor is over the character
//   rope      which rope style to draw (see renderer/overlay/styles.css)
//   gravity   1 = normal, lower = floaty
//   drag      how quickly a swing dies down
//   sway      strength of the idle breeze
//   climb     how fast it goes up and down its rope, px/s
//   travel    how it crosses the screen: 'swing' rope to rope, 'slide' along the top, or 'fly'
//   len       rope length it starts with; minLen..maxLen is the range it climbs within
//   idle      seconds between things it does on its own
//   pep       how hard it kicks
module.exports = {
  hero: require('./hero'),
  ninja: require('./ninja'),
  monkey: require('./monkey'),
  astronaut: require('./astronaut'),
  bat: require('./bat'),
  sloth: require('./sloth'),
  spider: require('./spider'),
};
