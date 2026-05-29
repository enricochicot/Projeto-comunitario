// ── ui.js ─────────────────────────────────────────────────────────────────────
// Responsável pela lista de pontos e filtros no painel lateral.
// Não conhece GPS, mapa ou localização — recebe dados e renderiza HTML.

// ── Estado interno ────────────────────────────────────────────────────────────
let _allPoints   = [];
let _searchQuery = '';

const TYPE_DISPLAY = {
  ecoponto: 'Ecoponto', supermercado: 'Supermercado', ong: 'ONG', escola: 'Escola',
};

// ── Render principal ──────────────────────────────────────────────────────────
function renderPointsList(points) {
  _allPoints = points;
  _applyFilter(activeFilter);
}

function _applyFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });

  let filtered = filter === 'todos' ? _allPoints : _allPoints.filter(p => p.type === filter);

  if (_searchQuery) {
    const q = _searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
    );
  }

  _updateCount(filtered.length);
  _renderList(filtered, filter);

  // Sincroniza marcadores no mapa com o filtro ativo
  if (typeof plotCollectionPoints === 'function') {
    plotCollectionPoints(filtered);
  }
}

function _updateCount(n) {
  const el = document.getElementById('points-count');
  if (!el) return;
  if (n > 0) {
    el.textContent = `${n} ponto${n > 1 ? 's' : ''}`;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
}

function _renderList(filtered, filter) {
  if (filtered.length === 0) {
    Dom.pointsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🫙</div>
        <p>${
          _allPoints.length === 0
            ? 'Nenhum ponto cadastrado para sua cidade ainda.'
            : _searchQuery
              ? `Nenhum resultado para <strong>"${_searchQuery}"</strong>.`
              : `Nenhum ponto do tipo <strong>${filter}</strong> encontrado.`
        }</p>
      </div>`;
    return;
  }

  Dom.pointsList.innerHTML = filtered.map(_buildCardHTML).join('');

  Dom.pointsList.querySelectorAll('.point-card').forEach(card => {
    card.addEventListener('click', _onCardClick);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _onCardClick.call(card); }
    });
  });
}

function _onCardClick() {
  const id    = Number(this.dataset.id);
  const point = _allPoints.find(p => p.id === id);
  if (point) flyToPoint(point);
  highlightCard(id);
}

function _buildCardHTML(point) {
  const mapsUrl  = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
  const accepts  = point.accepts.map(a => `<span class="accept-tag">${a}</span>`).join('');
  const phoneRow = point.phone
    ? `<a class="card-phone" href="tel:${point.phone.replace(/\D/g, '')}">${point.phone}</a>`
    : '';

  return `
    <div class="point-card" data-id="${point.id}" tabindex="0" role="button"
         aria-label="${point.name}, ${formatDistance(point.distanceKm)}">
      <div class="card-top">
        <div class="card-name">${point.name}</div>
        <div class="card-distance">${formatDistance(point.distanceKm)}</div>
      </div>
      <div class="card-type-badge">${TYPE_DISPLAY[point.type] || point.type}</div>
      <div class="card-address">${point.address}</div>
      <div class="card-accepts">${accepts}</div>
      <div class="card-schedule">${point.schedule}</div>
      ${phoneRow}
      <div class="card-actions">
        <a class="btn-directions" href="${mapsUrl}" target="_blank" rel="noopener noreferrer"
           onclick="event.stopPropagation()">Como chegar →</a>
      </div>
    </div>`;
}

// ── Filtros e busca ───────────────────────────────────────────────────────────
function clearPointsSearch() {
  _searchQuery = '';
  const el = document.getElementById('search-input');
  if (el) el.value = '';
}

document.getElementById('filter-chips')?.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (chip) _applyFilter(chip.dataset.filter);
});

document.getElementById('search-input')?.addEventListener('input', e => {
  _searchQuery = e.target.value.trim();
  _applyFilter(activeFilter);
});
