// ── init.js ──────────────────────────────────────────────────────────────────
// Store global: estado compartilhado e referências DOM.
// Padrão: objeto único (namespace) para evitar poluição do escopo global.

const Store = {
  map:          null,   // instância Leaflet
  userMarker:   null,   // circleMarker do usuário
  userPosition: null,   // { lat, lng }
  currentCity:  null,   // string | null
  activeFilter: 'todos',
};

// Referências DOM — resolvidas uma única vez
const Dom = {
  cityLabel:  document.getElementById('city-label'),
  pointsList: document.getElementById('points-list'),
};

// Atalhos mantidos para compatibilidade com módulos existentes
// (map.js, track.js, ui.js leem essas vars diretamente por enquanto)
let map          = null;
let userMarker   = null;
let userPosition = null;
let currentCity  = null;
let activeFilter = 'todos';

// Mantém Store e vars planas em sincronia
function _syncStore() {
  map          = Store.map;
  userMarker   = Store.userMarker;
  userPosition = Store.userPosition;
  currentCity  = Store.currentCity;
  activeFilter = Store.activeFilter;
}

function setCityLabel(city) {
  Store.currentCity = city;
  currentCity       = city;
  if (Dom.cityLabel) Dom.cityLabel.textContent = city;
}

// Referências legadas usadas por ui.js
const cityLabel  = Dom.cityLabel;
const pointsList = Dom.pointsList;
