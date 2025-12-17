# Deployment Guide (Vercel)

## Prerequisites
- Node.js 18.18+ and npm.
- Repo pushed to GitHub/GitLab/Bitbucket.

## Required environment variables (minimal)
- `NEXT_PUBLIC_TEST_MODE` (default: `true` for testing)
- `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.vercel.app`)

No auth keys are required. The app uses mock data + local storage only.

## Local setup
```bash
npm install
npm run build
npm run start
```

## Vercel deployment steps
1. Import the repo in Vercel.
2. Set environment variables:
   - `NEXT_PUBLIC_TEST_MODE=true` (for test logging/footer)
   - `NEXT_PUBLIC_SITE_URL=https://<your-vercel-domain>`
3. Build command: `npm run build`
4. Output: `.next`
5. Deploy. Vercel provides a public URL to share.

## Test mode
- Enabled by default via `NEXT_PUBLIC_TEST_MODE=true`.
- Shows “Early test version” footer note.
- Loosens rate limits and enables internal console info.
- Set to `false` for a quieter production-like run.

## Notes
- No login or auth required.
- All AI calls use in-app matching; no external AI keys needed.
- If build fails due to install timeouts, rerun `npm install` and `npm run build` once the network is stable.
