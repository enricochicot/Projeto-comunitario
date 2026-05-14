// ── track.js ──────────────────────────────────────────────────────────────────
// Obtém a posição GPS do usuário e usa reverse geocoding (Nominatim/OSM)
// para descobrir em qual cidade ele está — sem nenhuma API key.
//
// FLUXO:
//   GPS coords  →  Nominatim  →  nome da cidade  →  filtra pontos
//
// ANALOGIA FLUTTER: é como um LocationService que emite um Stream<Position>.
// Quem escuta (ui.js) reage quando a posição chega — sem saber como foi obtida.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

/**
 * Faz reverse geocoding: lat/lng → nome da cidade.
 * Nominatim retorna vários campos; priorizamos city > town > municipality.
 */
async function reverseGeocode(lat, lng) {
  try {
    const url = `${NOMINATIM_URL}?format=json&lat=${lat}&lon=${lng}&accept-language=pt-BR`;
    const res  = await fetch(url, {
      headers: { 'User-Agent': 'OleoMap/1.0 (descarte-oleo-app)' }
    });
    const data = await res.json();
    const addr = data.address || {};
    // Nominatim pode retornar city, town, village ou municipality
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
      const { latitude: lat, longitude: lng } = position.coords;
      userPosition = { lat, lng };
      updateUserMarker(lat, lng);

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
    { enableHighAccuracy: true, maximumAge: 10_000 }
  );
}