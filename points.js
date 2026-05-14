// ── points.js ─────────────────────────────────────────────────────────────────
// Fonte de dados mockada dos pontos de coleta de óleo usado.
//
// ANALOGIA FLUTTER: Este arquivo é como um Repository local que retorna dados
// falsos — o mesmo padrão que você usaria com um MockRepository em testes
// unitários antes de conectar a uma API real.
//
// Quando for para produção, bastará trocar `getPointsByCity()` por uma chamada
// fetch() a uma API, sem alterar nenhum outro arquivo. Esse é o poder de
// separar "fonte de dados" de "lógica de UI".

const COLLECTION_POINTS = [
  // ── São Paulo ─────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Ecoponto Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5669,
    lng: -46.6917,
    address: 'R. Henrique Schaumann, 460 – Pinheiros',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–17h · Sáb 8h–12h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 2,
    name: 'Supermercado Extra – Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5891,
    lng: -46.6378,
    address: 'Av. Domingos de Morais, 2564 – Vila Mariana',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–22h',
    type: 'supermercado',
    phone: null,
  },
  {
    id: 3,
    name: 'ONG Recicla Sampa',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5456,
    lng: -46.6388,
    address: 'R. Barão de Itapetininga, 140 – República',
    accepts: ['óleo vegetal', 'óleo de motor (embalado)'],
    schedule: 'Seg–Sex 9h–18h',
    type: 'ong',
    phone: '(11) 3456-7890',
  },
  {
    id: 4,
    name: 'E.E. Prof. João Saad – Projeto Eco',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.6008,
    lng: -46.6542,
    address: 'R. Domitila Vieira, 80 – Jabaquara',
    accepts: ['óleo vegetal'],
    schedule: 'Seg–Sex 7h–17h (período letivo)',
    type: 'escola',
    phone: null,
  },

  // ── Rio de Janeiro ────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Ecoponto Botafogo',
    city: 'Rio de Janeiro',
    state: 'RJ',
    lat: -22.9510,
    lng: -43.1782,
    address: 'R. Voluntários da Pátria, 190 – Botafogo',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 6,
    name: 'Pão de Açúcar – Ipanema',
    city: 'Rio de Janeiro',
    state: 'RJ',
    lat: -22.9838,
    lng: -43.2050,
    address: 'R. Visconde de Pirajá, 351 – Ipanema',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–23h',
    type: 'supermercado',
    phone: null,
  },
  {
    id: 7,
    name: 'ONG Óleo Vivo Carioca',
    city: 'Rio de Janeiro',
    state: 'RJ',
    lat: -22.9116,
    lng: -43.1756,
    address: 'Av. Rio Branco, 45 – Centro',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Ter e Qui 10h–16h',
    type: 'ong',
    phone: '(21) 2222-3333',
  },

  // ── Belo Horizonte ────────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Ecoponto Savassi',
    city: 'Belo Horizonte',
    state: 'MG',
    lat: -19.9386,
    lng: -43.9342,
    address: 'R. Pernambuco, 605 – Savassi',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sáb 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 9,
    name: 'Mercadão da BH – Centro',
    city: 'Belo Horizonte',
    state: 'MG',
    lat: -19.9184,
    lng: -43.9378,
    address: 'R. Curitiba, 2000 – Centro',
    accepts: ['óleo vegetal'],
    schedule: 'Seg–Sáb 7h–20h',
    type: 'supermercado',
    phone: null,
  },

  // ── Curitiba ──────────────────────────────────────────────────────────────
  {
    id: 10,
    name: 'Ecoponto Batel',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4399,
    lng: -49.2849,
    address: 'Av. do Batel, 1230 – Batel',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–18h · Sáb 8h–13h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 11,
    name: 'ONG Curitiba Recicla',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4279,
    lng: -49.2711,
    address: 'R. XV de Novembro, 800 – Centro',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 9h–17h',
    type: 'ong',
    phone: '(41) 3333-4444',
  },

  // ── Porto Alegre ──────────────────────────────────────────────────────────
  {
    id: 12,
    name: 'Ecoponto Moinhos de Vento',
    city: 'Porto Alegre',
    state: 'RS',
    lat: -30.0251,
    lng: -51.2028,
    address: 'R. Padre Chagas, 80 – Moinhos de Vento',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 13,
    name: 'Zaffari – Boa Vista',
    city: 'Porto Alegre',
    state: 'RS',
    lat: -30.0105,
    lng: -51.1955,
    address: 'Av. Cristóvão Colombo, 1288 – Boa Vista',
    accepts: ['óleo vegetal'],
    schedule: 'Diariamente 8h–22h',
    type: 'supermercado',
    phone: null,
  },

  // ── Fortaleza ─────────────────────────────────────────────────────────────
  {
    id: 14,
    name: 'Ecoponto Aldeota',
    city: 'Fortaleza',
    state: 'CE',
    lat: -3.7319,
    lng: -38.5070,
    address: 'Av. Santos Dumont, 5335 – Aldeota',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 7h–17h',
    type: 'ecoponto',
    phone: null,
  },

  // ── Manaus ────────────────────────────────────────────────────────────────
  {
    id: 15,
    name: 'ONG Amazônia Limpa',
    city: 'Manaus',
    state: 'AM',
    lat: -3.1019,
    lng: -60.0250,
    address: 'Av. Eduardo Ribeiro, 520 – Centro',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ong',
    phone: '(92) 3333-9999',
  },
];

// ── Funções de acesso aos dados ───────────────────────────────────────────────

/**
 * Retorna pontos filtrados pela cidade.
 * ANALOGIA: equivale a um `where` numa query Firestore/SQLite.
 */
function getPointsByCity(city) {
  if (!city) return [];
  const normalized = city.trim().toLowerCase();
  return COLLECTION_POINTS.filter(
    p => p.city.toLowerCase() === normalized
  );
}

/**
 * Fórmula de Haversine — calcula distância em km entre dois pontos GPS.
 * É o mesmo cálculo que apps como iFood usam para mostrar "2,3 km de você".
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) { return deg * (Math.PI / 180); }

/**
 * Formata distância para exibição amigável.
 * Ex: 0.34 → "340 m" | 2.7 → "2,7 km"
 */
function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1).replace('.', ',')} km`;
}

/**
 * Retorna pontos da cidade, enriquecidos com distância do usuário
 * e ordenados do mais próximo ao mais distante.
 */
function getPointsWithDistance(city, userLat, userLng) {
  return getPointsByCity(city)
    .map(p => ({
      ...p,
      distanceKm: haversineDistance(userLat, userLng, p.lat, p.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}