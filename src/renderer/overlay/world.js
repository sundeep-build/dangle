// Everything the overlay's modules share: the screen, the clock and who is on stage.
export const api = window.dangle;

export const world = {
  defs: {}, // the character registry, handed over by main at start
  W: window.innerWidth,
  H: window.innerHeight,
  roam: true, // characters wander by themselves
  clock: 0, // simulated seconds
  dragging: null, // the character being dragged, if any
  chars: [],
  ghosts: [], // ropes that were just let go of, fading out
};
