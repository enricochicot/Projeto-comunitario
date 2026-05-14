// ── map.js ────────────────────────────────────────────────────────────────────
// Responsável por tudo que acontece no mapa: inicialização, marcadores de
// usuário e pontos de coleta, e centralização.
//
// CONCEITO: Este módulo é "burro" — ele só sabe desenhar no mapa. Quem decide
// O QUE desenhar são track.js e ui.js. Separação de responsabilidades.

const TYPE_COLORS = {
  ecoponto:    '#2d6a4f',
  supermercado:'#1565c0',
  ong:         '#6a1b9a',
  escola:      '#c9a84c',
};

function createMarkerIcon(type) {
  const color = TYPE_COLORS[type] || '#2d6a4f';
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:28px;height:28px;
        background:${color};
        border:3px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,.3);
      "></div>`,
    iconSize:   [28, 28],
    iconAnchor: [14, 28],
    popupAnchor:[0, -30],
  });
}

function initMap(lat, lng) {
  if (map) return; // já inicializado

  map = L.map('map', { zoomControl: true }).setView([lat, lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // Marcador do usuário
  userMarker = L.circleMarker([lat, lng], {
    radius: 10,
    fillColor: '#52b788',
    color: '#1a3a2a',
    weight: 3,
    fillOpacity: 1,
  }).addTo(map).bindPopup('<b>Você está aqui</b>');
}

function updateUserMarker(lat, lng) {
  if (!map) { initMap(lat, lng); return; }
  userMarker.setLatLng([lat, lng]);
}

/**
 * Plota os pontos de coleta no mapa.
 * Retorna um Map<id, marker> para que ui.js possa abrir popups
 * ao clicar em um card.
 */
let pointMarkersMap = {};

function plotCollectionPoints(points) {
  // Limpa marcadores anteriores
  Object.values(pointMarkersMap).forEach(m => m.remove());
  pointMarkersMap = {};

  points.forEach(point => {
    const marker = L.marker([point.lat, point.lng], {
      icon: createMarkerIcon(point.type),
    }).addTo(map);

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;

    marker.bindPopup(`
      <div class="popup-inner">
        <div class="popup-name">${point.name}</div>
        <div class="popup-address">${point.address}</div>
        <a class="popup-btn" href="${mapsUrl}" target="_blank">Como chegar →</a>
      </div>
    `);

    marker.on('click', () => highlightCard(point.id));
    pointMarkersMap[point.id] = marker;
  });
}

function flyToPoint(point) {
  if (!map) return;
  map.flyTo([point.lat, point.lng], 16, { duration: 1 });
  pointMarkersMap[point.id]?.openPopup();
}

function highlightCard(pointId) {
  document.querySelectorAll('.point-card').forEach(el => {
    el.classList.toggle('active', el.dataset.id === String(pointId));
  });
}

/**
 * Recentraliza o mapa na posição do usuário.
 */
function recenterToUser() {
  if (!userPosition || !map) return;
  map.flyTo([userPosition.lat, userPosition.lng], 14, { duration: 0.8 });
}