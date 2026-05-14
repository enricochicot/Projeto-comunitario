// ── init.js ──────────────────────────────────────────────────────────────────
// Variáveis globais e utilitários compartilhados entre todos os módulos.
// Pense neste arquivo como o "estado global" da aplicação — em Flutter seria
// equivalente a um InheritedWidget ou provider raiz que todos os widgets leem.

let map = null;           // instância do Leaflet
let userMarker = null;    // marcador do usuário no mapa
let userPosition = null;  // { lat, lng } mais recente do usuário
let currentCity = null;   // nome da cidade detectada
let activeFilter = 'todos';

// Referências DOM — acessadas por vários módulos
const cityLabel   = document.getElementById('city-label');
const pointsList  = document.getElementById('points-list');

function setCityLabel(city) {
  currentCity = city;
  if (cityLabel) cityLabel.textContent = city;
}

function showError(msg) {
  console.error('[OleoMap]', msg);
}