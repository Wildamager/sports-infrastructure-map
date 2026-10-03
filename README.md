# Sports Infrastructure Map

Flask web application for exploring a city dataset of sports facilities: an
interactive map with a searchable side list, heat maps of accessibility, score
dials per sport, and a recommendations page.

Team project from the LCT (Linux CTF) hackathon, team RA1NF0RCE.

<!-- Screenshots: docs/screenshots/map.png -->

## Features

- **Interactive map** — Mapbox GL map with a clickable circle layer of facilities
- **Linked side list** — the list in the sidebar and the map stay in sync: clicking a
  record flies to the object, and clicking the map highlights the record
- **Heat maps** — Leaflet + `simpleheat` layers, switchable between raw accessibility
  and accessibility weighted by population density
- **Per-sport layers** — markers and reachability circles grouped by sport type
  (district / district-level / city / walking distance)
- **Analytics** — Raphael + JustGage score dials for basketball, football and hockey
- **GeoJSON API** — `/data` serves the facility dataset as JSON, parsed and cached once

## Stack

Python 3 · Flask · Jinja2 templates · Mapbox GL JS · Leaflet · simpleheat ·
Leaflet.heat · jQuery 2 · Bootstrap 4 · Raphael/JustGage

## Getting started

```bash
git clone https://github.com/Wildamager/crowd-pulse-map.git
cd crowd-pulse-map
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000/.

### Mapbox token

Map tiles come from Mapbox, so a public token is needed. Create one at
<https://account.mapbox.com/access-tokens/> and paste it into `static/js/config.js`:

```js
window.MAPBOX_TOKEN = 'pk.your_token_here';
```

Without a token the pages still load, but the map area stays empty.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `HOST` | `127.0.0.1` | bind address |
| `PORT` | `5000` | bind port |
| `FLASK_DEBUG` | `0` | set to `1` for the debugger and reloader |

## Data

| File | Contents |
|---|---|
| `static/map/test_map.geojson` | facility records served by `/data` (`Object`, `About`, `Num`) |
| `static/map/hotmap.geojson` | full dataset used by the heat map and per-sport layers |

Feature properties used by the front end: `Object`, `About`, `Num`, `Dostup`,
`Dostup_word`, `Plot_nasel`, `Type_of_sport`, `Name_organisation`,
`Sq_sportzon`, `Id_object`, `Id_sportzon`.

## Project structure

```text
.
├── app.py                  # Flask app, routes, cached GeoJSON loader
├── templates/
│   ├── base.html           # layout, menu, script includes
│   ├── index.html          # Mapbox map + side list + heat map
│   ├── analytics.html      # score dials
│   └── recommendations.html
├── static/
│   ├── js/                 # config.js, score dials, UI helpers
│   ├── map/                # heat map, per-sport layers, GeoJSON
│   ├── css/                # template styles, icon fonts
│   └── img/                # logos
└── requirements.txt
```

## Notes and limitations

- Hardcoded `127.0.0.1` URLs were replaced with relative paths, so the app works
  behind a reverse proxy and on any host.
- No token is committed to the repository — map rendering requires your own Mapbox
  token, see `static/js/config.js`.
- The dataset is large (~40 MB) and is loaded once per process, cached in memory.
  `density_map.geojson` was an exact copy of `hotmap.geojson` and was removed.
- `map_dencity.js` is machine-generated: one repeated block per sport type. It works,
  but a single pass that groups features by `Type_of_sport` would replace ~490 lines.
- The dataset is real-world location data — do not redistribute it publicly.

## License

[MIT](LICENSE)

---

## RU

Flask-приложение для визуализации городского реестра спортивных объектов:
интерактивная карта Mapbox со связанным списком объектов, тепловые карты
доступности (с учётом плотности населения и без), слои по видам спорта с кругами
достижимости, дашборд с оценками по баскетболу/футболу/хоккею и страница
рекомендаций. Данные отдаются через `/data` в формате GeoJSON и кэшируются в
памяти. Токен Mapbox нужно задать самому в `static/js/config.js`.