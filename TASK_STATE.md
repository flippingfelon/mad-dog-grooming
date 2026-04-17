# TASK_STATE.md

## 2026-04-17 — Auth added to scheduling dashboard

### Accomplished
- Added password-based login protecting all `/dashboard/*` and scheduling API routes
- Landing page (`/`) stays fully public
- Clicking "Schedule" in site nav takes you to login if not authenticated
- Session uses httpOnly cookie signed with HMAC (Web Crypto API, zero deps)
- Login page matches site branding (logo, cream/gold theme)
- Header shows "Log Out" on dashboard pages (desktop + mobile)
- Middleware redirects unauthenticated `/dashboard` requests to `/login`
- API returns 401 for unauthenticated requests to data endpoints
- Build passes clean, full auth flow verified via curl

### Files Created
- `.env.local` — AUTH_PASSWORD + AUTH_SECRET
- `src/lib/auth.ts` — session cookie name, token computation
- `src/middleware.ts` — route protection for /dashboard + /api
- `src/app/login/page.tsx` — login form
- `src/app/api/auth/login/route.ts` — password verify + set cookie
- `src/app/api/auth/logout/route.ts` — clear cookie

### Files Changed
- `src/components/Header.tsx` — added logout button, useRouter for logout flow

### Auth Config
- Password: set in `.env.local` as `AUTH_PASSWORD` (default: `MadDog2026!`)
- Secret: set in `.env.local` as `AUTH_SECRET`
- Cookie: `mad-dog-session`, httpOnly, 30-day expiry
- Change password: edit `.env.local` and restart server

### How to Run
```bash
cd workspace/mad-dog-grooming
npm install
npm run dev
# Landing page: http://localhost:3000
# Schedule (requires login): http://localhost:3000/dashboard
# Default password: MadDog2026!
```
