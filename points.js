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
  // ── São José do Rio Preto ─────────────────────────────────────────────────
  // Pontos cadastrados pela Coperlagos
  {
    id: 30,
    name: 'Coperlagos — Sede Central',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8197,
    lng: -49.3794,
    address: 'R. Voluntários da Pátria, 3869 – Boa Vista',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–17h · Sáb 8h–12h',
    type: 'ecoponto',
    phone: '(17) 3233-0000',
  },
  {
    id: 31,
    name: 'Ecoponto Redentora',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8089,
    lng: -49.3881,
    address: 'Av. Alberto Andaló, 3500 – Redentora',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: '(17) 3222-4455',
  },
  {
    id: 32,
    name: 'Ecoponto Boa Vista',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8340,
    lng: -49.3621,
    address: 'R. das Palmeiras, 1100 – Boa Vista',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–17h · Sáb 8h–12h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 33,
    name: 'ONG Recicla Rio Preto',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8176,
    lng: -49.3730,
    address: 'R. Campos Sales, 2845 – Centro',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 9h–17h',
    type: 'ong',
    phone: '(17) 3211-9876',
  },
  {
    id: 34,
    name: 'E.E. Prof. Myrian T. Rodrigues — Projeto Eco',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8258,
    lng: -49.3802,
    address: 'Av. Bady Bassitt, 3939 – Vila Redentora',
    accepts: ['óleo vegetal'],
    schedule: 'Seg–Sex 7h–17h (período letivo)',
    type: 'escola',
    phone: '(17) 3236-1122',
  },
  {
    id: 35,
    name: 'E.E. Cônego Bento Santana — Coleta Consciente',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8095,
    lng: -49.3950,
    address: 'R. Duque de Caxias, 2880 – Centro',
    accepts: ['óleo vegetal'],
    schedule: 'Seg–Sex 7h–17h (período letivo)',
    type: 'escola',
    phone: null,
  },
  {
    id: 36,
    name: 'Supermercado São Vicente – Rio Preto',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8220,
    lng: -49.3758,
    address: 'Av. Alberto Andaló, 5050 – São Pedro',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–22h',
    type: 'supermercado',
    phone: null,
  },
  {
    id: 37,
    name: 'Supermercado Atacadão – Rio Preto',
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.8455,
    lng: -49.3579,
    address: 'Rod. Washington Luís, km 449 – Distrito Industrial',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–21h',
    type: 'supermercado',
    phone: null,
  },

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

  // ── Salvador ──────────────────────────────────────────────────────────────
  {
    id: 16,
    name: 'Ecoponto Barra',
    city: 'Salvador',
    state: 'BA',
    lat: -13.0087,
    lng: -38.5340,
    address: 'Av. Oceânica, 2456 – Barra',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–17h · Sáb 8h–12h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 17,
    name: 'ONG Recicla Bahia',
    city: 'Salvador',
    state: 'BA',
    lat: -12.9714,
    lng: -38.5124,
    address: 'R. Chile, 50 – Centro Histórico',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 9h–17h',
    type: 'ong',
    phone: '(71) 3322-1100',
  },
  {
    id: 18,
    name: 'Supermercado Bompreço – Pituba',
    city: 'Salvador',
    state: 'BA',
    lat: -12.9896,
    lng: -38.4786,
    address: 'Av. Paulo VI, 1550 – Pituba',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–22h',
    type: 'supermercado',
    phone: null,
  },

  // ── Recife ────────────────────────────────────────────────────────────────
  {
    id: 19,
    name: 'Ecoponto Boa Viagem',
    city: 'Recife',
    state: 'PE',
    lat: -8.1200,
    lng: -34.9001,
    address: 'Av. Boa Viagem, 3000 – Boa Viagem',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 20,
    name: 'ONG Recife Sustentável',
    city: 'Recife',
    state: 'PE',
    lat: -8.0578,
    lng: -34.8829,
    address: 'R. do Bom Jesus, 197 – Bairro do Recife',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Ter e Qui 9h–15h',
    type: 'ong',
    phone: '(81) 3211-4567',
  },

  // ── Brasília ──────────────────────────────────────────────────────────────
  {
    id: 21,
    name: 'Ecoponto Asa Sul',
    city: 'Brasília',
    state: 'DF',
    lat: -15.8010,
    lng: -47.8976,
    address: 'SQS 308, Bloco A – Asa Sul',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–18h · Sáb 8h–13h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 22,
    name: 'Carrefour – Asa Norte',
    city: 'Brasília',
    state: 'DF',
    lat: -15.7473,
    lng: -47.8841,
    address: 'SHN Quadra 1 Bloco F – Asa Norte',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–23h',
    type: 'supermercado',
    phone: null,
  },
  {
    id: 23,
    name: 'E.C. EcoDF – Taguatinga',
    city: 'Brasília',
    state: 'DF',
    lat: -15.8350,
    lng: -48.0500,
    address: 'CNB 14 Lote 9 – Taguatinga Norte',
    accepts: ['óleo vegetal'],
    schedule: 'Seg–Sex 9h–17h (período letivo)',
    type: 'escola',
    phone: null,
  },

  // ── Goiânia ───────────────────────────────────────────────────────────────
  {
    id: 24,
    name: 'Ecoponto Setor Bueno',
    city: 'Goiânia',
    state: 'GO',
    lat: -16.6925,
    lng: -49.2609,
    address: 'Av. T-63, 1234 – Setor Bueno',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 25,
    name: 'ONG Verde Cerrado',
    city: 'Goiânia',
    state: 'GO',
    lat: -16.6780,
    lng: -49.2558,
    address: 'R. 9, nº 600 – Setor Oeste',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 9h–17h',
    type: 'ong',
    phone: '(62) 3244-5566',
  },

  // ── Florianópolis ─────────────────────────────────────────────────────────
  {
    id: 26,
    name: 'Ecoponto Trindade',
    city: 'Florianópolis',
    state: 'SC',
    lat: -27.5954,
    lng: -48.5480,
    address: 'R. Lauro Linhares, 800 – Trindade',
    accepts: ['óleo vegetal', 'óleo de fritura', 'gordura animal'],
    schedule: 'Seg–Sex 8h–17h · Sáb 8h–12h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 27,
    name: 'Supermercado Angeloni – Coqueiros',
    city: 'Florianópolis',
    state: 'SC',
    lat: -27.5838,
    lng: -48.5750,
    address: 'Av. Ivo Silveira, 2450 – Coqueiros',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Diariamente 7h–22h',
    type: 'supermercado',
    phone: null,
  },

  // ── Campinas ──────────────────────────────────────────────────────────────
  {
    id: 28,
    name: 'Ecoponto Cambuí',
    city: 'Campinas',
    state: 'SP',
    lat: -22.9001,
    lng: -47.0541,
    address: 'R. Padre Almeida, 44 – Cambuí',
    accepts: ['óleo vegetal', 'óleo de fritura'],
    schedule: 'Seg–Sex 8h–17h',
    type: 'ecoponto',
    phone: null,
  },
  {
    id: 29,
    name: 'ONG Campinas Limpa',
    city: 'Campinas',
    state: 'SP',
    lat: -22.9068,
    lng: -47.0624,
    address: 'Av. Francisco Glicério, 1000 – Centro',
    accepts: ['óleo vegetal', 'gordura animal'],
    schedule: 'Seg–Sex 9h–17h',
    type: 'ong',
    phone: '(19) 3223-7788',
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