// ── map.js ────────────────────────────────────────────────────────────────────
// Responsavel exclusivamente pelo mapa Leaflet.
// Nao conhece UI, store ou logica de negocio — recebe dados, desenha, expoe funcoes.

const TYPE_COLORS = {
  ecoponto:     '#2d6a4f',
  supermercado: '#1565c0',
  ong:          '#6a1b9a',
  escola:       '#c9a84c',
};

const TYPE_LABELS = {
  ecoponto: 'Ecoponto', supermercado: 'Supermercado', ong: 'ONG', escola: 'Escola',
};

// ── Icones ────────────────────────────────────────────────────────────────────
function createMarkerIcon(type) {
  const color = TYPE_COLORS[type] || '#2d6a4f';
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>`,
    iconSize:    [28, 28],
    iconAnchor:  [14, 28],
    popupAnchor: [0, -30],
  });
}

// ── Inicializacao ─────────────────────────────────────────────────────────────
function initMap(lat, lng) {
  if (map) return;

  map = L.map('map', { zoomControl: true }).setView([lat, lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '\u00a9 <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  userMarker = L.circleMarker([lat, lng], {
    radius: 10,
    fillColor: '#52b788',
    color: '#1a3a2a',
    weight: 3,
    fillOpacity: 1,
  }).addTo(map).bindPopup('<b>Voc\u00ea est\u00e1 aqui</b>');
}

let _accuracyCircle = null;

function updateUserMarker(lat, lng, accuracyMeters) {
  if (!map) { initMap(lat, lng); return; }
  userMarker.setLatLng([lat, lng]);

  // Circulo de precisao — mostra o raio do erro do GPS
  if (accuracyMeters && accuracyMeters > 0) {
    if (_accuracyCircle) {
      _accuracyCircle.setLatLng([lat, lng]).setRadius(accuracyMeters);
    } else {
      _accuracyCircle = L.circle([lat, lng], {
        radius: accuracyMeters,
        color: '#52b788',
        fillColor: '#52b788',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '4 4',
      }).addTo(map);
    }
  }
}

// ── Pontos de coleta ──────────────────────────────────────────────────────────
let _pointMarkersMap = {};

function _buildPopupHTML(point) {
  const mapsUrl  = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
  const tags     = point.accepts.map(a => `<span class="popup-tag">${a}</span>`).join('');
  const phoneRow = point.phone
    ? `<div class="popup-row"><span class="popup-row-icon">\ud83d\udcde</span><a href="tel:${point.phone.replace(/\D/g, '')}" class="popup-phone">${point.phone}</a></div>`
    : '';

  return `
    <div class="popup-inner">
      <div class="popup-badge">${TYPE_LABELS[point.type] || point.type}</div>
      <div class="popup-name">${point.name}</div>
      <div class="popup-row"><span class="popup-row-icon">\ud83d\udccd</span><span>${point.address}</span></div>
      <div class="popup-row"><span class="popup-row-icon">\ud83d\udd50</span><span>${point.schedule}</span></div>
      ${phoneRow}
      <div class="popup-accepts-label">Aceita:</div>
      <div class="popup-tags">${tags}</div>
      <a class="popup-btn" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Como chegar \u2192</a>
    </div>`;
}

function plotCollectionPoints(points) {
  Object.values(_pointMarkersMap).forEach(m => m.remove());
  _pointMarkersMap = {};

  points.forEach(point => {
    const marker = L.marker([point.lat, point.lng], {
      icon: createMarkerIcon(point.type),
    }).addTo(map);

    marker.bindPopup(_buildPopupHTML(point), { maxWidth: 280 });
    marker.on('click', () => highlightCard(point.id));
    _pointMarkersMap[point.id] = marker;
  });
}

// ── Navegacao ─────────────────────────────────────────────────────────────────
function flyToPoint(point) {
  if (!map) return;
  map.flyTo([point.lat, point.lng], 16, { duration: 1 });
  // Abre o popup apenas após a animação concluir, evitando que apareça fora de posição
  map.once('moveend', () => {
    _pointMarkersMap[point.id]?.openPopup();
  });
}

function highlightCard(pointId) {
  document.querySelectorAll('.point-card').forEach(el => {
    el.classList.toggle('active', el.dataset.id === String(pointId));
  });
  document.querySelector(`.point-card[data-id="${pointId}"]`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function recenterToUser() {
  if (!userPosition || !map) return;
  map.flyTo([userPosition.lat, userPosition.lng], 14, { duration: 0.8 });
}
