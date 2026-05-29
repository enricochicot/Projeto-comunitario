// ── track.js ──────────────────────────────────────────────────────────────────
// Obtém a posição GPS do usuário e usa reverse geocoding (Nominatim/OSM)
// para descobrir em qual cidade ele está — sem nenhuma API key.
//
// FLUXO:
//   GPS coords  →  Nominatim  →  nome da cidade  →  filtra pontos

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';
const GEOCODE_TIMEOUT_MS = 8000;

/**
 * Faz reverse geocoding: lat/lng → nome da cidade.
 * Nominatim retorna vários campos; priorizamos city > town > municipality.
 */
async function reverseGeocode(lat, lng) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GEOCODE_TIMEOUT_MS);

    const url = `${NOMINATIM_URL}?format=json&lat=${lat}&lon=${lng}&accept-language=pt-BR`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'OleoMap/1.0 (descarte-oleo-app)' },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) return null;

    const data = await res.json();
    const addr = data.address || {};
    return addr.city || addr.town || addr.village || addr.municipality || null;
  } catch {
    return null;
  }
}

/**
 * Inicia o rastreamento contínuo da posição do usuário.
 * Chama onLocationReady(lat, lng, city) quando a cidade for detectada.
 * Chama onPositionUpdate(lat, lng) nas atualizações seguintes.
 */
function trackLocation({ onLocationReady, onPositionUpdate, onError }) {
  if (!('geolocation' in navigator)) {
    onError?.('Seu navegador não suporta geolocalização.');
    return;
  }

  let cityResolved = false;

  navigator.geolocation.watchPosition(
    async position => {
      const { latitude: lat, longitude: lng, accuracy } = position.coords;
      userPosition = { lat, lng };
      updateUserMarker(lat, lng, accuracy);
      _updateAccuracyBadge(accuracy);

      if (!cityResolved) {
        cityResolved = true; // evita múltiplas chamadas ao Nominatim
        const city = await reverseGeocode(lat, lng);
        onLocationReady?.(lat, lng, city);
      } else {
        onPositionUpdate?.(lat, lng);
      }
    },
    err => {
      const msg = err?.code === err?.PERMISSION_DENIED
        ? 'Permita o acesso à localização para encontrar pontos próximos.'
        : 'Não foi possível obter sua localização.';
      onError?.(msg);
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 15_000 }
  );
}

function _updateAccuracyBadge(meters) {
  const el = document.getElementById('accuracy-badge');
  if (!el) return;
  if (meters <= 20)       { el.textContent = `±${Math.round(meters)} m`; el.className = 'accuracy-badge good'; }
  else if (meters <= 100) { el.textContent = `±${Math.round(meters)} m`; el.className = 'accuracy-badge ok'; }
  else                    { el.textContent = `±${meters >= 1000 ? (meters/1000).toFixed(1)+'km' : Math.round(meters)+'m'} (impreciso)`; el.className = 'accuracy-badge bad'; }
  el.hidden = false;
}