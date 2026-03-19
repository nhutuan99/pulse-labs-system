# Pulse Labs — Crypto Trading Dashboard

> **Stack:** Next.js 16 · React 19 · TailwindCSS v4 · TypeScript  
> **Backend:** FastAPI (Python) · Binance · CoinGecko · Supabase  
> **Language:** Vietnamese (vi-VN)

---

## 🎯 Product Overview

**Pulse Labs** là dashboard phân tích thị trường crypto, giúp trader Việt Nam ra quyết định dựa trên data thay vì cảm tính.

### Core Features

| # | Feature | Mô tả |
|---|---------|-------|
| 1 | **Market Phase Detection** | Phát hiện 6 giai đoạn thị trường (ACCUMULATE → PRE_BULL → BULL_RUN → FOMO → PRE_BEAR → BEAR_RUN) với hệ thống chấm điểm 100 points (70 triggers + 30 confirmations) |
| 2 | **Trending Token Discovery** | Quét top 50 cặp USDT từ Binance, phase-aware scoring, enrichment từ CoinGecko, default bullish filter |
| 3 | **Token Deep Dive** | Phân tích 4 chiều: Overview (giá, chart), Tokenomics (supply, staking), Social (Twitter/Reddit/Discord), Risk (4 loại rủi ro) |
| 4 | **Trading Signals** | 4 loại signal (BUY/SELL/HOLD/WATCH), 3 mức strength, auto-expiry, background cleanup mỗi 5 phút |

---

## 🔄 Use Case Flows (Frontend)

### UC1: Dashboard Load (Main Page)

```
User opens Dashboard
  → POST /analyze (BTC/USDT) → MarketStatusCard (phase, risk, sentiment, recommendations)
  → GET /trending/tokens → TrendingBoard (50 tokens, phase badges, scores)
  → GET /signals → SignalPanel (buy/sell/hold/watch cards)
  → All APIs load in parallel with individual loading states
  → API fail → mock data fallback (never blank)
```

### UC2: Trending Token Discovery

```
TrendingBoard renders
  → Binance → top 50 USDT pairs (by volume)
  → Each token: OHLCV → phase detection → trending score (0-100)
  → Batch CoinGecko → market cap, logo, name
  → Default filter: bullish phases only (BULL_RUN, PRE_BULL, ACCUMULATE, FOMO)
  → Sort by: Trending Score | Price % | Volume | Market Cap
  → Auto-refresh every 5 minutes
```

### UC3: Token Deep Dive (4-tab Modal)

```
User clicks token card → Opens Detail Modal
  → Promise.all() loads 4 APIs (each with .catch → null):
    Tab 1 — Overview: price chart, 4 stat cards, composite scores
    Tab 2 — Tokenomics: inflation, staking APY, burn rate, holder distribution
    Tab 3 — Social: Twitter/Reddit/Discord stats, sentiment (-100→+100), trending topics
    Tab 4 — Risk: overall score + 4 breakdown (volatility, liquidity, tokenomics, sentiment)
```

### UC4: Trading Signal Management

```
Signal Panel on dashboard sidebar
  → GET /signals?limit=20 → active signals list
  → Each SignalCard: type icon (color-coded) + symbol + confidence% + strength badge + countdown
  → Buy/Sell counter badges in header
  → Filter by token_symbol or signal_type
  → Background scheduler cleans expired signals every 5 min
```

---

## 🏗️ Frontend Architecture Patterns

| Pattern | Áp dụng |
|---------|---------|
| **Parallel API Loading** | Dashboard gọi 4 API song song, mỗi cái có loading state riêng |
| **Mock Data Fallback** | API fail → mock data, dashboard không bao giờ blank |
| **SWR (Stale-While-Revalidate)** | Trả cache ngay, update background (indicators: 15m, AI: 1h) |
| **Auto-refresh** | Trending tokens auto-refresh mỗi 5 phút (`setInterval` + cleanup) |
| **Lazy Loading** | Token detail data chỉ tải khi user click mở modal |
| **Error Isolation** | Promise.all với `.catch(() => null)` — 1 API fail không block cả modal |
| **snake_case → camelCase Mapping** | API Python response → TypeScript client interface |

---

## 📊 Market Phases (6 giai đoạn)

| Phase | Label VN | Tín hiệu | Màu |
|-------|----------|-----------|-----|
| ACCUMULATE | Tích lũy | Gom hàng dần, kiên nhẫn | 🟢 |
| PRE_BULL | Chuẩn bị tăng | MA Breakout + Fibonacci | 🔵 |
| BULL_RUN | Tăng trưởng | Wave target + Volume surge | 🟢 |
| FOMO | Đỉnh | Không đu đỉnh, siết SL | 🟡 |
| PRE_BEAR | Chuẩn bị giảm | MA Breakdown + Fibonacci | 🟠 |
| BEAR_RUN | Suy thoái | Hạn chế mua, chờ đảo chiều | 🔴 |

---

## 📡 API Endpoints (Frontend consumes)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/analyze` | POST | Market phase analysis (BTC/USDT) |
| `/api/v1/trending/tokens` | GET | Top 50 trending tokens |
| `/api/v1/tokens/{symbol}/overview` | GET | Token overview (price, chart) |
| `/api/v1/tokens/{symbol}/tokenomics` | GET | Token supply & staking data |
| `/api/v1/tokens/{symbol}/social` | GET | Social media metrics |
| `/api/v1/tokens/{symbol}/risk` | GET | Risk assessment breakdown |
| `/api/v1/signals` | GET/POST | Trading signals CRUD |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, error boundaries)
├── components/       # UI components (navbars, modals, cards, base)
├── contexts/         # Feature-specific React contexts
├── data/             # Static/mock data
├── hooks/            # Custom React hooks
├── layouts/          # Dashboard layout wrappers
├── providers/        # Global providers (Query, App, Breakpoints, Settings)
├── shared/
│   ├── api/          # API layer (auth, contact, user queries)
│   ├── constant/     # Token keys, storage constants
│   ├── helpers/      # Utilities (toast, url, utils)
│   ├── locales/      # i18n translations (en, vi)
│   ├── parsers/      # URL/data parsers (nuqs)
│   ├── services/     # HTTP client (Axios + interceptor + ServiceList)
│   └── types/        # Shared TypeScript interfaces
├── styles/           # Design tokens (colors, spacing, shadows, fonts, breakpoints)
├── config.ts         # App configuration defaults
├── i18n.ts           # i18next setup (vi/en)
├── instrumentation.ts # Next.js server lifecycle (Sentry)
└── proxy.ts          # Route protection (auth middleware)
```
