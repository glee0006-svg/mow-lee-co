# 茂利號腊味 · Mow Lee & Co.

Production website for Mow Lee Shing Kee & Co. — San Francisco's oldest continuously-operating Chinese cured-meats shop, established 1856. Built with Next.js 14 (App Router), Square payments, deployed on Vercel.

## Quick start

```bash
cp .env.local.example .env.local      # fill in your Square sandbox keys
npm install
npm run dev                            # http://localhost:3000
npm run build                          # production build
npm start                              # serve the build
```

See [`DEPLOY.md`](./DEPLOY.md) for the full Square + Vercel setup walkthrough.

## Stack

- **Next.js 14.2** App Router. Server components by default; `"use client"` only where state is needed.
- **React 18.3**
- **Square Web Payments SDK** (client tokenization) + **`square`** Node SDK (server-side payment creation).
- **Vanilla CSS** — one `app/globals.css` carries the entire design system.

## Routes

| Path | Description |
|---|---|
| `/` | Homepage — hero · ticker · why us · featured · story · press · shop · craft · visit · footer |
| `/lineage` | Six-generation lineage page — chapters, ownership table, addresses |
| `/checkout` | Multi-step: Information → Pickup → Payment (Square) |
| `/checkout/success` | Order confirmation + pickup reminder + Square receipt link |
| `/api/checkout` | POST endpoint — receives source token, processes Square payment |
| `/sitemap.xml`, `/robots.txt` | Auto-generated |

## Checkout flow

```
Cart Drawer  ──► /checkout (Information)  ──►  /checkout (Pickup)  ──►  /checkout (Payment)
                                                                              │
                                                                  Square card tokenize
                                                                              │
                                                                  POST /api/checkout
                                                                              │
                                                                  Square createPayment
                                                                              │
                                                                      /checkout/success
```

- Customer info, pickup date/time, and order notes are validated on the client and re-validated server-side in `app/api/checkout/route.js`.
- Card data is tokenized in the browser by Square's iframe — your server never touches a card number.
- `referenceId` and `note` on the Square payment carry the order number, customer details, and pickup info so the kitchen sees them in the Square dashboard.

## Project structure

```
nextjs/
├── app/
│   ├── layout.jsx                 Root layout (fonts, JSON-LD, AppProvider)
│   ├── page.jsx                   Homepage
│   ├── loading.jsx, error.jsx
│   ├── not-found.jsx              Brand-styled 404
│   ├── globals.css                Design system (~2000 lines)
│   ├── sitemap.js, robots.js
│   ├── lineage/
│   │   ├── layout.jsx
│   │   └── page.jsx               /lineage
│   ├── checkout/
│   │   ├── layout.jsx
│   │   ├── page.jsx               /checkout (multi-step)
│   │   └── success/
│   │       ├── layout.jsx
│   │       └── page.jsx           /checkout/success
│   └── api/
│       └── checkout/
│           └── route.js           POST /api/checkout (Square)
├── components/
│   ├── TopBar.jsx                 Sticky nav, lang toggle, cart trigger
│   ├── Hero.jsx, Ticker.jsx, WhyUs.jsx
│   ├── FeaturedGrid.jsx           Homepage product tiles
│   ├── Story.jsx, FeaturedIn.jsx
│   ├── Shop.jsx                   Category tabs, rows, detail modal, qty stepper
│   ├── Craft.jsx, Visit.jsx, Footer.jsx
│   ├── CartDrawer.jsx             Slide-out cart, links to /checkout
│   ├── SectionDivider.jsx, Credentials.jsx, ImageSlot.jsx
│   ├── CheckoutStepper.jsx        4-step progress rail
│   ├── OrderSummary.jsx           Sticky cart summary, used on every checkout step
│   └── SquarePayment.jsx          Square Web Payments SDK card form
├── lib/
│   ├── i18n.js                    Bilingual content + catalog + palettes
│   ├── store.jsx                  AppProvider + useApp (cart + lang)
│   └── square.js                  Square SDK loader + card style tokens
├── public/                        favicon set, manifest, OG image
├── .env.local.example
├── next.config.mjs                Cache headers, image formats
├── vercel.json                    Region pin (sfo1)
├── jsconfig.json                  @/ path alias
├── package.json                   next 14.2 · react 18.3 · square ^38
├── DEPLOY.md
└── README.md
```

## i18n

Language is a body class (`en` / `zh`) toggled by the top-bar pill. Every text node renders both `<span class="lang-en">` and `<span class="lang-zh">`; CSS hides the inactive one. Persisted to localStorage. Native HTML `<input type="date">` etc. is locale-aware automatically.

## Performance

- Server components for static sections (Story, WhyUs, Craft, Visit, Footer, FeaturedIn).
- `content-visibility: auto` on below-the-fold sections.
- Ticker is GPU-composited.
- `prefers-reduced-motion` kill switch.
- 1-year immutable cache on `/public/*.svg|jpg|png|woff|ico` (configured in `next.config.mjs`).
- Square SDK is lazy-loaded only on `/checkout`.

## Adding real product photography

Each `<ImageSlot>` accepts a `src` prop:

```jsx
<ImageSlot id="thumb-s1" src="/products/pork-sausage.jpg" placeholder="Pork Sausage" />
```

Drop JPG/WebP files into `public/products/` and reference them as `/products/filename.jpg`.

— Six generations. One Chinatown storefront. One craft.
