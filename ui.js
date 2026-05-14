// ── ui.js ─────────────────────────────────────────────────────────────────────
// Responsável por renderizar a lista de pontos no painel lateral.
// Não sabe nada sobre GPS ou mapa — só recebe dados e monta HTML.
//
// ANALOGIA FLUTTER: é um StatefulWidget que recebe uma List<Point> como
// parâmetro e constrói ListView.builder com os cards.

let allPoints = []; // cache dos pontos carregados (com distância)

/**
 * Renderiza a lista de pontos no painel.
 * @param {Array} points - pontos já enriquecidos com distanceKm
 */
function renderPointsList(points) {
  allPoints = points;
  applyFilter(activeFilter);
}

function applyFilter(filter) {
  activeFilter = filter;

  // Atualiza estado visual dos chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });

  const filtered = filter === 'todos'
    ? allPoints
    : allPoints.filter(p => p.type === filter);

  if (filtered.length === 0) {
    pointsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🫙</div>
        <p>${allPoints.length === 0
          ? 'Nenhum ponto cadastrado para sua cidade ainda.'
          : `Nenhum ponto do tipo <strong>${filter}</strong> encontrado.`
        }</p>
      </div>`;
    return;
  }

  pointsList.innerHTML = filtered.map(buildCardHTML).join('');

  // Eventos dos cards
  pointsList.querySelectorAll('.point-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      const point = allPoints.find(p => p.id === id);
      if (point) flyToPoint(point);
      highlightCard(id);
    });
  });
}

function buildCardHTML(point) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
  const accepts = point.accepts.map(a => `<span class="accept-tag">${a}</span>`).join('');
  const typeName = { ecoponto: 'Ecoponto', supermercado: 'Supermercado', ong: 'ONG', escola: 'Escola' };

  return `
    <div class="point-card" data-id="${point.id}">
      <div class="card-top">
        <div class="card-name">${point.name}</div>
        <div class="card-distance">${formatDistance(point.distanceKm)}</div>
      </div>
      <div class="card-type-badge">${typeName[point.type] || point.type}</div>
      <div class="card-address">${point.address}</div>
      <div class="card-accepts">${accepts}</div>
      <div class="card-schedule">${point.schedule}</div>
      <div class="card-actions">
        <a class="btn-directions" href="${mapsUrl}" target="_blank"
           onclick="event.stopPropagation()">Como chegar →</a>
      </div>
    </div>`;
}

// ── Filtros ───────────────────────────────────────────────────────────────────
document.getElementById('filter-chips')?.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (chip) applyFilter(chip.dataset.filter);
});