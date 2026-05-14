// ── app.js ────────────────────────────────────────────────────────────────────
// Ponto de entrada — orquestra todos os módulos.
// ANALOGIA: é o main() do Flutter, ou o runApp(). Liga as peças, não implementa
// nenhuma lógica diretamente.

// Mapa padrão enquanto aguarda localização
initMap(-14.2350, -51.9253); // centro geográfico do Brasil
setCityLabel('Detectando cidade...');

trackLocation({
  onLocationReady(lat, lng, city) {
    if (!city) {
      // Cidade não reconhecida — mostra todos os pontos no mapa sem filtrar
      setCityLabel('Cidade não identificada');
      pointsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📍</div>
          <p>Não conseguimos identificar sua cidade. Verifique sua conexão.</p>
        </div>`;
      return;
    }

    setCityLabel(`${city}`);

    const points = getPointsWithDistance(city, lat, lng);
    plotCollectionPoints(points);
    renderPointsList(points);

    if (points.length > 0) {
      // Centraliza o mapa nos pontos da cidade
      map.setView([points[0].lat, points[0].lng], 14);
    }
  },

  onPositionUpdate(lat, lng) {
    // Atualiza distâncias na lista conforme usuário se move
    if (!currentCity) return;
    const updated = getPointsWithDistance(currentCity, lat, lng);
    renderPointsList(updated);
    plotCollectionPoints(updated);
  },

  onError(msg) {
    setCityLabel('Sem localização');
    pointsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <p>${msg}</p>
      </div>`;
  },
});

// ── Botão de recentralização ────────────────────────────────────────────────
document.getElementById('recenter-btn').addEventListener('click', recenterToUser);