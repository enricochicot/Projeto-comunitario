# OleoMap: Mapa Comunitário de Coleta de Óleo (Projeto Comunitário)

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen)
![Licença](https://img.shields.io/badge/Licença-MIT-blue)
![Stack](https://img.shields.io/badge/Stack-HTML%20%2B%20CSS%20%2B%20JS-orange)
![Mapa](https://img.shields.io/badge/Mapa-Leaflet%20%2B%20OpenStreetMap-green)
![Iniciativa](https://img.shields.io/badge/Iniciativa-Coperlagos-darkgreen)

## Contexto do Projeto

Desenvolvido como **projeto comunitário vinculado à Coperlagos**, o OleoMap é uma aplicação web que conecta moradores de diversas cidades brasileiras aos **pontos de coleta de óleo de cozinha usado**, facilitando o descarte correto e sustentável.

A plataforma detecta automaticamente a localização do usuário via GPS, exibe os pontos de coleta mais próximos em um mapa interativo e fornece rotas diretas para os locais — tudo sem necessidade de cadastro ou instalação.

### Público-Alvo

| Perfil | Descrição |
|---|---|
| Moradores em geral | Pessoas que desejam descartar óleo de cozinha de forma correta |
| Comunidade local | Participantes de ecopontos, escolas e ONGs parceiras |
| Parceiros comerciais | Supermercados e estabelecimentos que servem como pontos de coleta |

---

## Funcionalidades da Plataforma

- **Detecção de Localização via GPS:** Identifica automaticamente a cidade e a posição do usuário com geocodificação reversa (Nominatim/OpenStreetMap), exibindo o nível de precisão do sinal.
- **Mapa Interativo:** Exibe marcadores coloridos por categoria em cima de tiles do OpenStreetMap, com popups detalhados ao clicar em cada ponto.
- **Lista de Pontos Ordenada por Distância:** Painel lateral (desktop) e bottom sheet deslizável (mobile) com todos os pontos próximos ordenados por distância calculada com a fórmula de Haversine.
- **Filtros por Categoria:** Chips de filtro rápido por tipo: Ecoponto, Supermercado, ONG e Escola.
- **Busca por Nome ou Endereço:** Campo de busca em tempo real que filtra simultâneamente a lista e os marcadores no mapa.
- **Navegação Direta:** Botão "Como chegar →" em cada ponto abre o Google Maps com rota já calculada.
- **Definição Manual de Localização:** Busca de endereço por texto livre ou CEP (integração com ViaCEP + Nominatim), com seleção do resultado desejado.
- **Sugestão de Novo Ponto:** Formulário modal para que qualquer usuário sugira um novo ponto de coleta.
- **Design Mobile-First:** Interface totalmente responsiva com bottom sheet arrastável no mobile e painel fixo lateral no desktop.

---

## Tecnologias Utilizadas

| Categoria | Tecnologia | Detalhe |
|---|---|---|
| Estrutura | HTML5 | Marcação semântica, ARIA, meta viewport-fit=cover |
| Estilo | CSS3 | Variáveis customizadas, Flexbox, animações, mobile-first (breakpoint 721px) |
| Lógica | JavaScript (ES6+) | Vanilla JS modularizado em 6 arquivos, sem dependências de build |
| Mapa | Leaflet.js | Tiles OpenStreetMap, marcadores SVG custom, popups estilizados |
| Geocodificação | Nominatim (OSM) | Reverse geocoding para detectar cidade; forward geocoding para busca manual |
| CEP | ViaCEP | Resolução de CEP brasileiro para endereço completo antes do geocoding |
| Tipografia | Google Fonts | Syne (títulos) + DM Sans (corpo) |
| Controle de versão | Git + GitHub | Branch `main` |

---

## 📁 Estrutura do Projeto

O projeto adota arquitetura de **separação clara de responsabilidades**, com cada arquivo tendo uma única função definida:

```
Projeto-comunitario/
├── index.html   # Shell da aplicação — estrutura HTML, modais e referências
├── style.css    # Toda a estilização, tokens CSS e responsividade
├── init.js      # Store global compartilhado e referências DOM
├── points.js    # Banco de dados local dos pontos de coleta + cálculo de distância
├── map.js       # Integração com Leaflet: mapa, marcadores, popups e navegação
├── track.js     # Rastreamento GPS e geocodificação reversa via Nominatim
├── ui.js        # Renderização da lista, filtros, busca e cards de pontos
└── app.js       # Orquestrador: inicializa módulos e gerencia bottom sheet e modais
```

---

## Cobertura Geográfica

O banco de dados local cobre atualmente **13 cidades brasileiras**, com foco principal em São José do Rio Preto (parceria Coperlagos):

| Cidade | UF | Pontos cadastrados |
|---|---|---|
| São José do Rio Preto | SP | 8 (sede Coperlagos + ecopontos, ONGs, escolas, supermercados) |
| São Paulo | SP | 4 |
| Rio de Janeiro | RJ | 3 |
| Belo Horizonte | MG | 2 |
| Curitiba | PR | 2 |
| Porto Alegre | RS | 2 |
| Fortaleza | CE | 1 |
| Manaus | AM | 1 |
| Salvador | BA | 3 |
| Recife | PE | 2 |
| Brasília | DF | 3 |
| Goiânia | GO | 2 |
| Florianópolis | SC | 2 |
| Campinas | SP | 2+ |

### Tipos de Ponto Aceitos

| Tipo | Ícone no Mapa | Materiais Aceitos |
|---|---|---|
| Ecoponto | 🟢 Verde escuro | Óleo vegetal, óleo de fritura, gordura animal |
| Supermercado | 🔵 Azul | Óleo vegetal, óleo de fritura |
| ONG | 🟣 Roxo | Óleo vegetal, gordura animal |
| Escola | 🟡 Âmbar | Óleo vegetal (período letivo) |

---

## Mecânicas de Localização

### Fluxo de Detecção Automática

```
GPS (watchPosition) → Nominatim reverse geocoding → Cidade identificada
                   → Filtra pontos da cidade → Ordena por distância (Haversine)
                   → Renderiza lista + marcadores no mapa
```

### Cálculo de Distância

A distância entre o usuário e cada ponto é calculada com a **fórmula de Haversine**, que considera a curvatura da Terra para precisão real em distâncias curtas:

| Campo | Detalhe |
|---|---|
| Raio da Terra usado | 6.371 km |
| Unidade de exibição | km (com 1 casa decimal) ou "< 100 m" |
| Atualização | A cada nova posição GPS |

### Busca Manual por Endereço ou CEP

1. Usuário digita endereço, bairro ou CEP
2. Se for CEP: resolve via **ViaCEP** → monta query para Nominatim
3. Se for texto livre: envia diretamente ao **Nominatim forward geocoding**
4. Exibe até 5 resultados para o usuário selecionar
5. Aplica a localização e recarrega os pontos mais próximos

---

## Como Executar Localmente

Não há dependências, build ou instalação necessária. O projeto roda diretamente no navegador.

### Pré-requisitos

- Qualquer navegador moderno com suporte à Geolocation API (Chrome, Edge, Firefox, Safari)
- Conexão com a internet (para tiles do OpenStreetMap e geocodificação via Nominatim)

### Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/enricochicot/Projeto-comunitario.git
   cd Projeto-comunitario
   ```

2. Abra diretamente no navegador:
   ```bash
   # macOS/Linux
   open index.html

   # Windows
   start index.html
   ```
   Ou utilize a extensão **Live Server** no VS Code e acesse `http://127.0.0.1:5500/index.html`.

3. Permita o acesso à localização quando solicitado pelo navegador para que a detecção automática de cidade funcione.

### Observações

- Todos os dados de pontos são **locais** — definidos em `points.js`, sem chamadas a banco de dados externo.
- A aplicação é **100% client-side**: sem backend, sem autenticação, sem cookies.
- O geocoding reverso usa a API pública do **Nominatim (OpenStreetMap)** — sujeita a rate limit de 1 req/s para uso não comercial.
- Para adicionar novos pontos de coleta, basta incluir entradas no array `COLLECTION_POINTS` em `points.js`.

---

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma *Issue* para discutir a funcionalidade que deseja adicionar ou o bug encontrado, e em seguida submeta um *Pull Request* na branch `main`.

Para sugerir um ponto de coleta diretamente pela interface, use o botão **"Sugerir novo ponto"** disponível no rodapé do painel.

---

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
