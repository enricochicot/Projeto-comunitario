// app.js - Orquestrador: conecta todos os modulos.

// 1. Mapa inicial
initMap(-20.8197, -49.3794); // Sao Jose do Rio Preto
setCityLabel('Detectando cidade...');

// 2. Rastreamento GPS
trackLocation({
  onLocationReady(lat, lng, city) {
    if (!city) {
      setCityLabel('Cidade nao identificada');
      Dom.pointsList.innerHTML = '<div class="empty-state"><div class="empty-icon">📍</div><p>Nao conseguimos identificar sua cidade.</p></div>';
      return;
    }
    setCityLabel(city);
    const points = getPointsWithDistance(city, lat, lng);
    renderPointsList(points);  // _applyFilter dentro já plota no mapa
    if (points.length > 0) map.setView([points[0].lat, points[0].lng], 14);
  },
  onPositionUpdate(lat, lng) {
    if (!currentCity) return;
    const updated = getPointsWithDistance(currentCity, lat, lng);
    renderPointsList(updated);  // _applyFilter dentro já plota no mapa
  },
  onError(msg) {
    setCityLabel('Sem localizacao');
    Dom.pointsList.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><p>${msg}</p></div>`;
  },
});

// 3. Botao recentralizar
document.getElementById('recenter-btn')?.addEventListener('click', recenterToUser);

// 4. Bottom sheet (mobile)
(function initBottomSheet() {
  const panel     = document.getElementById('points-panel');
  const handle    = document.getElementById('panel-handle');
  const recenterBtn = document.getElementById('recenter-btn');
  if (!panel || !handle) return;

  const isMobile = () => !window.matchMedia('(min-width: 721px)').matches;

  let startY = 0, startH = 0, dragging = false;

  const peekH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sheet-peek')) || 260;
  const fullH = () => panel.parentElement.clientHeight - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 56) - 48;

  // Move o botão recentralizar para ficar sempre acima do sheet
  function _syncRecenterPos() {
    if (!recenterBtn || !isMobile()) return;
    const sheetH = panel.getBoundingClientRect().height;
    recenterBtn.style.bottom = (sheetH + 14) + 'px';
  }

  handle.addEventListener('touchstart', e => {
    if (!isMobile()) return;
    dragging = true;
    startY = e.touches[0].clientY;
    startH = panel.getBoundingClientRect().height;
    panel.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!dragging || !isMobile()) return;
    const newH = Math.min(Math.max(startH + (startY - e.touches[0].clientY), peekH()), fullH());
    panel.style.height = newH + 'px';
    _syncRecenterPos();
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (!dragging || !isMobile()) return;
    dragging = false;
    panel.style.transition = '';
    const mid = (peekH() + fullH()) / 2;
    if (panel.getBoundingClientRect().height > mid) {
      panel.style.height = '';
      panel.classList.add('is-open');
    } else {
      panel.style.height = '';
      panel.classList.remove('is-open');
    }
    setTimeout(() => { map?.invalidateSize(); _syncRecenterPos(); }, 350);
  });

  handle.addEventListener('click', () => {
    if (!isMobile()) return;
    panel.classList.toggle('is-open');
    setTimeout(() => { map?.invalidateSize(); _syncRecenterPos(); }, 350);
  });

  document.getElementById('map')?.addEventListener('click', () => {
    if (!isMobile()) return;
    panel.classList.remove('is-open');
    setTimeout(() => { map?.invalidateSize(); _syncRecenterPos(); }, 350);
  });

  // Posição inicial
  setTimeout(_syncRecenterPos, 100);
})();

// 5. Modal: Sugerir novo ponto
(function initModal() {
  const overlay   = document.getElementById('modal-suggest');
  const form      = document.getElementById('suggest-form');
  const successEl = document.getElementById('modal-success');

  function open() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('f-name')?.focus(), 50);
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    form.reset();
    form.hidden = false;
    successEl.hidden = true;
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  document.getElementById('add-point-link')?.addEventListener('click', e => { e.preventDefault(); open(); });
  document.getElementById('modal-close')?.addEventListener('click', close);
  document.getElementById('modal-success-btn')?.addEventListener('click', close);
  overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay && !overlay.hidden) close(); });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      const ok = f.value.trim() !== '';
      f.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;
    form.hidden = true;
    successEl.hidden = false;
    document.getElementById('modal-success-btn')?.focus();
  });
})();

// 6. Modal: Definir localização manual
(function initLocationModal() {
  const overlay    = document.getElementById('modal-location');
  const closeBtn   = document.getElementById('modal-location-close');
  const form       = document.getElementById('location-form');
  const input      = document.getElementById('location-input');
  const searchBtn  = document.getElementById('location-search-btn');
  const errorEl    = document.getElementById('location-error');
  const resultsEl  = document.getElementById('location-results');

  function open() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 50);
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    input.value = '';
    errorEl.hidden = true;
    resultsEl.hidden = true;
    resultsEl.innerHTML = '';
    searchBtn.disabled = false;
  }

  document.getElementById('set-location-btn')?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay && !overlay.hidden) close();
  });

  async function geocodeSearch(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=pt-BR&addressdetails=1`;
    const res  = await fetch(url, {
      headers: { 'User-Agent': 'OleoMap/1.0 (descarte-oleo-app)' },
    });
    if (!res.ok) throw new Error('Erro na busca');
    return res.json();
  }

  // Retorna true se o texto parece um CEP brasileiro (ex: "15014-110" ou "15014110")
  function _isCep(text) {
    return /^\d{5}-?\d{3}$/.test(text.trim());
  }

  // Resolve CEP via ViaCEP e retorna um endereço formatado para geocodificação
  async function _resolveCep(cep) {
    const digits = cep.replace(/\D/g, '');
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) throw new Error('CEP não encontrado');
    const data = await res.json();
    if (data.erro) throw new Error('CEP não encontrado');
    // Monta string de endereço para o Nominatim
    const parts = [data.logradouro, data.bairro, data.localidade, data.uf, 'Brasil']
      .filter(Boolean);
    return { query: parts.join(', '), viaCep: data };
  }

  function applyManualLocation(lat, lng, nominatimResult) {
    // Usa o objeto address estruturado do Nominatim (muito mais confiável que cortar display_name)
    const addr     = nominatimResult.address || {};
    const cityRaw  = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';

    // Atualiza marcador e posição do usuário
    userPosition = { lat, lng };
    Store.userPosition = { lat, lng };
    updateUserMarker(lat, lng, 0);
    map.flyTo([lat, lng], 14, { duration: 1 });

    // Tenta encontrar cidade exata no banco de pontos
    let points = getPointsWithDistance(cityRaw, lat, lng);

    if (points.length === 0 && cityRaw) {
      // Fallback: correspondência parcial (ex: "Rio Preto" bate "São José do Rio Preto")
      const q = cityRaw.toLowerCase();
      const allCities = [...new Set(COLLECTION_POINTS.map(p => p.city))];
      const cityMatch = allCities.find(c =>
        c.toLowerCase().includes(q) || q.includes(c.toLowerCase())
      );
      if (cityMatch) points = getPointsWithDistance(cityMatch, lat, lng);
    }

    if (points.length === 0) {
      // Último recurso: mostra todos ordenados por distância a partir do ponto escolhido
      points = COLLECTION_POINTS
        .map(p => ({ ...p, distanceKm: haversineDistance(lat, lng, p.lat, p.lng) }))
        .sort((a, b) => a.distanceKm - b.distanceKm);
    }

    if (points.length > 0) {
      setCityLabel(points[0].city);
      currentCity = points[0].city;
      Store.currentCity = points[0].city;
    } else {
      setCityLabel(cityRaw || 'Local definido');
    }

    // Limpa busca textual para não suprimir os pontos recém-carregados
    clearPointsSearch();
    renderPointsList(points);

    const accEl = document.getElementById('accuracy-badge');
    if (accEl) { accEl.textContent = 'manual'; accEl.className = 'accuracy-badge ok'; accEl.hidden = false; }
    close();
  }

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const rawQuery = input.value.trim();
    if (!rawQuery) return;

    searchBtn.disabled = true;
    searchBtn.textContent = 'Buscando…';
    errorEl.hidden = true;
    resultsEl.hidden = true;
    resultsEl.innerHTML = '';

    try {
      // Se parece CEP, resolve primeiro no ViaCEP depois geocodifica
      let searchQuery = rawQuery;
      let cepHint = null;
      if (_isCep(rawQuery)) {
        const cepData = await _resolveCep(rawQuery);
        searchQuery = cepData.query;
        cepHint = cepData.viaCep; // guarda para enriquecer o card de resultado
      }

      const results = await geocodeSearch(searchQuery);
      searchBtn.disabled = false;
      searchBtn.textContent = 'Buscar';

      if (!results.length) {
        errorEl.textContent = 'Nenhum endereço encontrado. Tente ser mais específico.';
        errorEl.hidden = false;
        return;
      }

      resultsEl.innerHTML = results.map((r, i) => {
        const parts = r.display_name.split(',');
        // Se veio de CEP, exibe logradouro + cidade do ViaCEP como nome principal
        const name   = cepHint
          ? `${cepHint.logradouro || 'Endereço'} — ${cepHint.localidade}`
          : parts[0].trim();
        const detail = cepHint
          ? `${cepHint.bairro ? cepHint.bairro + ' · ' : ''}CEP ${cepHint.cep} · ${cepHint.uf}`
          : parts.slice(1, 3).join(',').trim();
        return `<button class="location-result-item" data-idx="${i}">
          <span class="location-result-icon">📍</span>
          <span class="location-result-text">
            <span class="location-result-name">${name}</span>
            <span class="location-result-detail">${detail}</span>
          </span>
        </button>`;
      }).join('');

      resultsEl.hidden = false;

      resultsEl.querySelectorAll('.location-result-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const r = results[Number(btn.dataset.idx)];
          applyManualLocation(parseFloat(r.lat), parseFloat(r.lon), r);
        });
      });

    } catch (err) {
      searchBtn.disabled = false;
      searchBtn.textContent = 'Buscar';
      errorEl.textContent = err.message === 'CEP não encontrado'
        ? 'CEP não encontrado. Verifique e tente novamente.'
        : 'Erro ao buscar. Verifique sua conexão.';
      errorEl.hidden = false;
    }
  });
})();
