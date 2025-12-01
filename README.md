# CoinMarketCap Replica

Pixel-focused recreation of [coinmarketcap.com](https://coinmarketcap.com) with a Tailwind-powered frontend and a Flask backend that can inject dynamic data into the markets table and news feed.

## Project Structure

```
/
├── index.html                # Main cryptocurrencies board
├── exchanges.html            # Exchange league tables
├── derivatives.html          # Futures & perpetuals dashboard
├── news.html                 # Editorial hub (injection target: #news-feed)
├── portfolio.html            # Portfolio tracker mock
├── watchlist.html            # Personalized watchlist surface
├── css/styles.css            # Custom tokens & helpers layered on Tailwind
├── js/main.js                # Mock data, sparkline generator, UI handlers
├── images/logo.svg           # Minimalist CoinMarketCap-style mark
├── server.py                 # Flask server + injection helpers
├── metadata.py               # Agenticverse metadata contract
├── entity.py                 # Agent definition that boots the server
└── site_analysis.yaml        # Color, typography, and layout blueprint
```

## Tech Stack

- **HTML5 + Tailwind CSS CDN** for rapid, precise layout work
- **Custom CSS tokens** (in `css/styles.css`) for gradients, pills, sparkline theming
- **Vanilla JavaScript** for mock market data, filtering, and miniature SVG sparklines
- **Flask** backend with simple DOM-string injection hooks for market rows and news cards
- **Agenticverse metadata/entity wiring** to make the replica API-ready

## Running the Replica

1. **Install dependencies** (Flask is the only runtime requirement):

   ```bash
   pip install flask agenticverse-entities  # or ensure the host runtime provides these
   ```

2. **Start the server** (defaults to port `5000`):

   ```bash
   python server.py  # when run via the agent runtime use start_server(...)
   ```

3. **Open the UI** at `http://localhost:5000` and browse the linked subpages.

### Injecting Custom Content

The backend watches for payloads shaped by `metadata.py`. Provide the payload when calling `start_server(port=5000, content_data=...)`.

- **Market table rows** (default `section=index`): supply fields such as `rank`, `asset_name`, `symbol`, `price`, `market_cap`, `change_24h`, `change_7d`, `change_30d`, and `sparkline_points`.
- **News cards** (`section=news`): include `title`, `description`, `author`, `timestamp`, and optional `tag`.

Rows or cards land ahead of the existing mock data so they are immediately visible and outlined with a dashed highlight.

## Key Features

- Tight visual fidelity for CoinMarketCap’s navigation, KPI banners, chip filters, and market table
- SVG-based sparkline renderer that mirrors the screenshot’s mini-charts without external libraries
- Responsive grid that collapses gracefully down to mobile breakpoints
- Five supporting pages (Exchanges, Derivatives, News, Portfolio, Watchlist) to mirror real navigation depth
- Backend injection utility + metadata contract for future API hookups or agent-driven experimentation

## Known Limitations

- Data is mocked locally; there is no live API connection yet
- Table filtering/search operates on the in-memory dataset only
- Injection currently targets `index.html` (markets) and `news.html`; extend `server.py` if more slots are required
- Authentication buttons are static decorations—no auth/session layer is implemented

## Credits

This project is produced solely for demo and testing purposes and is **not** affiliated with the real CoinMarketCap platform.
