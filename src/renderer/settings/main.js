// Dangle — the window where the cast is chosen.
const api = window.dangle;
const cast = document.getElementById('cast');
const $ = (id) => document.getElementById(id);
const cards = new Map(); // type → { card, input }

function build(state) {
  for (const { type, name, svg } of state.cast) {
    const card = document.createElement('label');
    card.className = 'card';
    const art = document.createElement('div');
    art.className = 'art';
    art.innerHTML = svg; // the app's own built-in drawing
    const title = document.createElement('span');
    title.textContent = name;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'switch';
    input.addEventListener('change', () => api.setType(type, input.checked));
    card.append(art, title, input);
    cast.appendChild(card);
    cards.set(type, { card, input });
  }
}

function show(state) {
  let on = 0;
  for (const item of state.cast) {
    const { card, input } = cards.get(item.type);
    input.checked = item.on;
    card.classList.toggle('on', item.on);
    if (item.on) on += 1;
  }
  $('roam').checked = state.roam;
  $('hidden').checked = !state.visible;
  $('login').checked = state.openAtLogin;
  $('all').disabled = on === state.cast.length;
  $('none').disabled = on === 0;
  $('summary').textContent =
    on === 0
      ? 'Nobody is hanging right now. Switch a character on to bring it back.'
      : !state.visible
        ? `${on} of ${state.cast.length} switched on, hidden for now.`
        : `${on} of ${state.cast.length} hanging on your screen.`;
}

$('all').addEventListener('click', () => api.setAll(true));
$('none').addEventListener('click', () => api.setAll(false));
$('roam').addEventListener('change', (event) => api.setRoam(event.target.checked));
$('hidden').addEventListener('change', (event) => api.setVisible(!event.target.checked));
$('login').addEventListener('change', (event) => api.setLogin(event.target.checked));
$('home').addEventListener('click', () => api.home());
$('quit').addEventListener('click', () => api.quit());

api.get().then((state) => {
  build(state);
  show(state);
  api.onState(show);
});
