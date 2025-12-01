const assets = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 69234.45,
    marketCap: 1367900000000,
    volume: 26890000000,
    circulating: "19,720,512 BTC",
    dominance: 52.4,
    change24: 1.92,
    change7d: 4.37,
    change30d: 14.8,
    isPositive: true,
    tag: "currency",
    sparkline: [92, 95, 94, 98, 103, 101, 108, 112, 116, 118, 120]
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3820.17,
    marketCap: 458200000000,
    volume: 14500000000,
    circulating: "120,236,101 ETH",
    dominance: 18.1,
    change24: -0.84,
    change7d: 3.12,
    change30d: 10.21,
    isPositive: false,
    tag: "smart-contract",
    sparkline: [78, 80, 79, 81, 82, 79, 77, 78, 80, 83, 82]
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    marketCap: 114000000000,
    volume: 42000000000,
    circulating: "112,989,542,112 USDT",
    dominance: 5.7,
    change24: 0.01,
    change7d: 0.03,
    change30d: 0.02,
    isPositive: true,
    tag: "stablecoin",
    sparkline: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
  },
  {
    rank: 4,
    name: "BNB",
    symbol: "BNB",
    price: 612.33,
    marketCap: 94230000000,
    volume: 3150000000,
    circulating: "153,856,150 BNB",
    dominance: 3.4,
    change24: 0.54,
    change7d: -1.7,
    change30d: 6.2,
    isPositive: true,
    tag: "exchange",
    sparkline: [62, 61, 60, 59, 60, 64, 66, 64, 65, 67, 66]
  },
  {
      rank: 5,
      name: "Solana",
      symbol: "SOL",
      price: 162.73,
      marketCap: 74500000000,
      volume: 6120000000,
      circulating: "457,151,382 SOL",
      dominance: 2.8,
      change24: -3.8,
      change7d: -6.1,
      change30d: -12.4,
      isPositive: false,
      tag: "smart-contract",
      sparkline: [120, 118, 122, 116, 110, 108, 112, 113, 109, 105, 101]
    },
  {
    rank: 6,
    name: "XRP",
    symbol: "XRP",
    price: 0.62,
    marketCap: 34000000000,
    volume: 1410000000,
    circulating: "54,343,112,400 XRP",
    dominance: 1.3,
    change24: 1.35,
    change7d: 3.24,
    change30d: 7.8,
    isPositive: true,
    tag: "payments",
    sparkline: [42, 42, 43, 44, 43, 40, 41, 45, 44, 45, 46]
  },
  {
    rank: 7,
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.183,
    marketCap: 26000000000,
    volume: 1800000000,
    circulating: "143,867,112,020 DOGE",
    dominance: 1.1,
    change24: -0.65,
    change7d: 1.1,
    change30d: 4.44,
    isPositive: false,
    tag: "meme",
    sparkline: [35, 36, 37, 35, 33, 34, 35, 34, 35, 36, 35]
  },
  {
    rank: 8,
    name: "TRON",
    symbol: "TRX",
    price: 0.127,
    marketCap: 11000000000,
    volume: 540000000,
    circulating: "87,221,124,334 TRX",
    dominance: 0.7,
    change24: 0.72,
    change7d: 2.01,
    change30d: 6.9,
    isPositive: true,
    tag: "smart-contract",
    sparkline: [44, 44, 45, 44, 43, 44, 45, 46, 45, 46, 47]
  },
  {
    rank: 9,
    name: "Toncoin",
    symbol: "TON",
    price: 6.32,
    marketCap: 22000000000,
    volume: 930000000,
    circulating: "3,489,552,821 TON",
    dominance: 0.8,
    change24: 4.45,
    change7d: 8.2,
    change30d: 22.4,
    isPositive: true,
    tag: "layer-1",
    sparkline: [25, 28, 29, 30, 33, 35, 36, 37, 39, 40, 42]
  },
  {
    rank: 10,
    name: "Cardano",
    symbol: "ADA",
    price: 0.512,
    marketCap: 18000000000,
    volume: 805000000,
    circulating: "35,401,221,234 ADA",
    dominance: 0.65,
    change24: -1.63,
    change7d: -3.45,
    change30d: -1.8,
    isPositive: false,
    tag: "smart-contract",
    sparkline: [88, 85, 86, 84, 82, 81, 82, 80, 79, 78, 77]
  }
];

const newsItems = [
  {
    title: "Bitcoin ETF net inflows top $280M ahead of halving",
    author: "CMC Research",
    timestamp: "2h ago",
    tag: "Research"
  },
  {
    title: "Layer-2 TVL rockets as devs chase cheaper block space",
    author: "CoinMarketCap",
    timestamp: "4h ago",
    tag: "Layer 2"
  },
  {
    title: "Stablecoin share of crypto market hits new high",
    author: "On-chain Desk",
    timestamp: "6h ago",
    tag: "Markets"
  }
];

const filters = {
  all: () => true,
  gainer: (item) => item.change24 > 0,
  loser: (item) => item.change24 < 0,
  stablecoin: (item) => item.tag === "stablecoin",
  meme: (item) => item.tag === "meme",
  "smart-contract": (item) => item.tag === "smart-contract"
};

const formatPrice = (value) => {
  if (value >= 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(5)}`;
};

const formatNumber = (value) => {
  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  return value.toLocaleString();
};

const buildSparklinePath = (points) => {
  const height = 36;
  const width = 120;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const diff = max - min || 1;
  const step = width / (points.length - 1);
  return points
    .map((point, idx) => {
      const x = idx * step;
      const y = height - ((point - min) / diff) * height;
      return `${idx === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

const renderRow = (asset) => {
  const path = buildSparklinePath(asset.sparkline);
  const sevenClass = asset.change7d >= 0 ? "text-emerald-500" : "text-rose-500";
  const thirtyClass = asset.change30d >= 0 ? "text-emerald-500" : "text-rose-500";

  return `
    <tr class="data-row text-sm" data-symbol="${asset.symbol}">
      <td class="py-4 pl-4 pr-3 font-semibold text-slate-700">${asset.rank}</td>
      <td class="py-4 pr-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full market-gradient flex items-center justify-center font-bold text-slate-700">${asset.symbol.substring(0, 2)}</div>
          <div>
            <p class="font-semibold text-slate-900">${asset.name}</p>
            <p class="text-xs uppercase tracking-wide text-slate-500">${asset.symbol}</p>
          </div>
        </div>
      </td>
      <td class="py-4 font-semibold text-slate-900">${formatPrice(asset.price)}</td>
      <td class="py-4 text-slate-700">${formatNumber(asset.marketCap)}</td>
      <td class="py-4 text-slate-700">${formatNumber(asset.volume)}</td>
      <td class="py-4 text-slate-700">${asset.circulating}</td>
      <td class="py-4">
        <span class="status-pill ${asset.change24 >= 0 ? "positive" : "negative"}">${asset.change24.toFixed(2)}%</span>
      </td>
      <td class="py-4 ${sevenClass}">${asset.change7d.toFixed(2)}%</td>
      <td class="py-4 ${thirtyClass}">${asset.change30d.toFixed(2)}%</td>
      <td class="py-4 text-slate-700">${asset.dominance.toFixed(1)}%</td>
      <td class="py-4 pr-4">
        <svg width="120" height="36" viewBox="0 0 120 36" class="${asset.isPositive ? "stroke-emerald-500" : "stroke-rose-500"}" fill="none" stroke-width="2">
          <path d="${path}" stroke="currentColor" fill="none" />
        </svg>
      </td>
      <td class="py-4 pr-4">
        <button class="favorite-btn" aria-label="Toggle watchlist">
          <svg class="w-5 h-5 text-slate-400 hover:text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
        </button>
      </td>
    </tr>
  `;
};

const renderTable = (data) => {
  const tableBody = document.getElementById("market-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = data.map(renderRow).join("");
};

const handleSearch = () => {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = assets.filter(
      (item) => item.name.toLowerCase().includes(value) || item.symbol.toLowerCase().includes(value)
    );
    renderTable(filtered);
  });
};

const handleFilters = () => {
  const chips = document.querySelectorAll("[data-filter]");
  if (!chips.length) return;
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filterKey = chip.dataset.filter;
      const predicate = filters[filterKey] || filters.all;
      renderTable(assets.filter(predicate));
    });
  });
};

const handleFavorites = () => {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-btn");
    if (!button) return;
    button.classList.toggle("text-amber-400");
    const icon = button.querySelector("svg");
    icon.classList.toggle("text-amber-400");
    icon.classList.toggle("fill-current");
  });
};

const renderNews = () => {
  const newsFeed = document.getElementById("news-feed");
  if (!newsFeed) return;
  newsFeed.innerHTML = newsItems
    .map(
      (item) => `
        <article class="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-3">
          <div class="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
            <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600">${item.tag}</span>
            <span>${item.timestamp}</span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 leading-snug">${item.title}</h3>
          <p class="text-sm text-slate-500">${item.author}</p>
          <button class="text-sm font-semibold text-blue-600 flex items-center gap-2">Read article →</button>
        </article>
      `
    )
    .join("");
};

const init = () => {
  renderTable(assets);
  handleSearch();
  handleFilters();
  handleFavorites();
  renderNews();
};

window.addEventListener("DOMContentLoaded", init);

window.appendInjectedRow = (htmlString) => {
  const tableBody = document.getElementById("market-table-body");
  if (!tableBody) return;
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const row = template.content.firstElementChild;
  if (row) {
    row.classList.add("injected");
    tableBody.prepend(row);
  }
};
