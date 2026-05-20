# Deploy checklist · Mow Lee & Co.

## 1. Square Developer setup

1. Sign up at <https://developer.squareup.com> and create an application.
2. Open the application → **Credentials**. You'll find separate Sandbox and Production credential sets.
3. Open the application → **Locations** to find your Location ID.
4. Note these values (you'll need them for env vars below):
   - `Application ID` — sandbox version is prefixed `sandbox-`
   - `Access token`
   - `Location ID`

For local dev, use the **Sandbox** credentials. Test the flow with [Square's sandbox card numbers](https://developer.squareup.com/docs/devtools/sandbox/payments) (e.g. `4111 1111 1111 1111`, any future expiry, any CVV, any ZIP).

## 2. Environment variables

Copy `.env.local.example` → `.env.local` for local dev. In Vercel, add the same keys via **Project Settings → Environment Variables**.

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SQUARE_APP_ID` | Square application ID (browser-safe) |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | Square location ID (browser-safe) |
| `SQUARE_ACCESS_TOKEN` | Server-only Square access token. **Never** expose to the client. |
| `SQUARE_LOCATION_ID` | Same value as the public one — server uses this when creating the payment |
| `SQUARE_ENVIRONMENT` | `sandbox` or `production` |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://mowleeco.com` |

The `NEXT_PUBLIC_` prefix is what makes a var available in the browser bundle. The access token has no prefix because it must stay server-only — it can authorize charges.

## 3. Build locally

```bash
cd nextjs
cp .env.local.example .env.local
# fill in your Square sandbox credentials
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
```

## 4. Deploy to Vercel

1. Push this `nextjs/` folder to a Git repo (GitHub / GitLab / Bitbucket).
2. Vercel → **Add New Project** → import the repo.
3. Framework detected automatically as Next.js.
4. **Add env vars** (see table above).
5. Deploy.
6. Add custom domain in **Project → Settings → Domains**.

## 5. Go live with Square production

When you're ready to take real payments:

1. Switch the env vars in Vercel to your **Production** Square credentials.
2. Set `SQUARE_ENVIRONMENT=production`.
3. The Square JS SDK is auto-selected client-side based on whether the App ID is prefixed `sandbox-`, so no separate code change is needed.

## 6. Pre-launch asset checklist

Replace these placeholders in `public/` before launch:
- `og.jpg` — Open Graph card (1200×630) — currently a generated wordmark
- `favicon.ico`, `icon.svg`, `apple-icon.png`, `icon-192.png`, `icon-512.png` — currently generated 茂 monogram

## 7. Demo mode

If Square env vars are missing, the checkout still loads — `SquarePayment.jsx` shows a "Demo mode" notice and "Place Order" simulates a successful payment so you can preview the full UX without credentials. The first real Square config you add lights up real payments.
