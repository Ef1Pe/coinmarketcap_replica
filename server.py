"""Flask server for the CoinMarketCap replica."""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List

from flask import Flask, send_from_directory

BASE_DIR = Path(__file__).parent

# Storage used to keep track of injected content coming from the agent runtime.
injected_content: List[Dict] = []


def build_market_row(item: Dict) -> str:
  """Return an HTML table row that mirrors the market table styling."""
  price = item.get("price", 0.0)
  market_cap = item.get("market_cap", 0)
  volume = item.get("volume_24h", 0)
  change_24 = item.get("change_24h", 0.0)
  change_7 = item.get("change_7d", 0.0)
  change_30 = item.get("change_30d", 0.0)
  dominance = item.get("dominance", 0.0)
  sparkline = item.get("sparkline_points", [50, 52, 54, 55, 57, 59, 60])

  def format_large(value: float) -> str:
    if value >= 1_000_000_000_000:
      return f"{value / 1_000_000_000_000:.2f}T"
    if value >= 1_000_000_000:
      return f"{value / 1_000_000_000:.2f}B"
    if value >= 1_000_000:
      return f"{value / 1_000_000:.2f}M"
    return f"{value:,.0f}"

  def build_path(points: List[float]) -> str:
    height = 36
    width = 120
    max_point = max(points)
    min_point = min(points)
    span = max(max_point - min_point, 1)
    step = width / max(len(points) - 1, 1)
    coords = []
    for idx, point in enumerate(points):
      x_pos = idx * step
      y_pos = height - ((point - min_point) / span) * height
      prefix = "M" if idx == 0 else "L"
      coords.append(f"{prefix}{x_pos:.2f},{y_pos:.2f}")
    return " ".join(coords)

  path_data = build_path(sparkline)
  change_class = "positive" if change_24 >= 0 else "negative"
  seven_class = "text-emerald-500" if change_7 >= 0 else "text-rose-500"
  thirty_class = "text-emerald-500" if change_30 >= 0 else "text-rose-500"
  sparkline_class = "stroke-emerald-500" if change_7 >= 0 else "stroke-rose-500"

  return f"""
    <tr class=\"data-row injected\">
      <td class=\"py-4 pl-4 pr-3 font-semibold text-slate-700\">{item.get('rank', '—')}</td>
      <td class=\"py-4 pr-4\">
        <div class=\"flex items-center gap-3\">
          <div class=\"w-10 h-10 rounded-full market-gradient flex items-center justify-center font-bold text-slate-700\">{item.get('symbol', 'NA')[:2]}</div>
          <div>
            <p class=\"font-semibold text-slate-900\">{item.get('asset_name', 'Injected Asset')}</p>
            <p class=\"text-xs uppercase tracking-wide text-slate-500\">{item.get('symbol', '').upper()}</p>
          </div>
        </div>
      </td>
      <td class=\"py-4 font-semibold text-slate-900\">${price:,.4f}</td>
      <td class=\"py-4 text-slate-700\">{format_large(market_cap)}</td>
      <td class=\"py-4 text-slate-700\">{format_large(volume)}</td>
      <td class=\"py-4 text-slate-700\">{item.get('circulating_supply', '—')}</td>
      <td class=\"py-4\"><span class=\"status-pill {change_class}\">{change_24:.2f}%</span></td>
      <td class=\"py-4 {seven_class}\">{change_7:.2f}%</td>
      <td class=\"py-4 {thirty_class}\">{change_30:.2f}%</td>
      <td class=\"py-4 text-slate-700\">{dominance:.1f}%</td>
      <td class=\"py-4 pr-4\">
        <svg width=\"120\" height=\"36\" viewBox=\"0 0 120 36\" class=\"{sparkline_class}\" fill=\"none\" stroke-width=\"2\">
          <path d=\"{path_data}\" stroke=\"currentColor\" fill=\"none\"></path>
        </svg>
      </td>
      <td class=\"py-4 pr-4\">
        <span class=\"text-xs text-slate-500\">Injected</span>
      </td>
    </tr>
  """


def build_news_card(item: Dict) -> str:
  """Return the HTML card used by the news page."""
  return f"""
    <article class=\"p-5 rounded-2xl border border-amber-300 bg-white injected-highlight flex flex-col gap-3\">
      <div class=\"flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500\">
        <span class=\"px-3 py-1 rounded-full bg-slate-100 text-slate-600\">{item.get('tag', 'Update')}</span>
        <span>{item.get('timestamp', 'Just now')}</span>
      </div>
      <h3 class=\"text-lg font-semibold text-slate-900 leading-snug\">{item.get('title', 'Injected Headline')}</h3>
      <p class=\"text-sm text-slate-600\">{item.get('description', '')}</p>
      <p class=\"text-xs text-slate-500\">{item.get('author', 'Injected Source')}</p>
    </article>
  """


def inject_content(html_content: str, page_name: str) -> str:
  """Insert injected content based on the page context."""
  normalized = page_name.replace('.html', '')
  for item in injected_content:
    target_section = (item.get('section') or 'index').replace('.html', '')
    if target_section == 'news' and normalized == 'news':
      html_content = inject_html(html_content, 'news-feed', build_news_card(item))
    elif target_section in {'index', 'market', 'cryptocurrencies'} and normalized == 'index':
      html_content = inject_html(html_content, 'market-table-body', build_market_row(item))
  return html_content


def inject_html(html_content: str, element_id: str, addition: str) -> str:
  marker = f'id="{element_id}"'
  marker_index = html_content.find(marker)
  if marker_index == -1:
    return html_content
  insert_index = html_content.find('>', marker_index)
  if insert_index == -1:
    return html_content
  insert_index += 1
  return html_content[:insert_index] + addition + html_content[insert_index:]


def create_app() -> Flask:
  app = Flask(__name__, static_folder=None)

  @app.route('/css/<path:filename>')
  def serve_css(filename: str):
    return send_from_directory(BASE_DIR / 'css', filename)

  @app.route('/js/<path:filename>')
  def serve_js(filename: str):
    return send_from_directory(BASE_DIR / 'js', filename)

  @app.route('/images/<path:filename>')
  def serve_images(filename: str):
    return send_from_directory(BASE_DIR / 'images', filename)

  def serve_page(page: str):
    html_path = BASE_DIR / f'{page}.html'
    if not html_path.exists():
      return "Page not found", 404
    html_content = html_path.read_text(encoding='utf-8')
    return inject_content(html_content, page)

  @app.route('/')
  @app.route('/index.html')
  def index():
    return serve_page('index')

  @app.route('/<page>.html')
  def section(page: str):
    return serve_page(page)

  @app.route('/api/content')
  def api_content() -> Dict:
    return {"count": len(injected_content), "content": injected_content}

  return app


def start_server(port: int = 5000, threaded: bool = False, content_data: Dict | None = None):
  if content_data and content_data not in injected_content:
    injected_content.append(content_data)
    print(f"[CoinMarketCap Replica] Injected payload for section {content_data.get('section', 'index')}")

  app = create_app()
  from agenticverse_entities.base.server_base import start_server as start_base_server

  return start_base_server(app, port=port, threaded=threaded)


if __name__ == "__main__":
  start_server()
