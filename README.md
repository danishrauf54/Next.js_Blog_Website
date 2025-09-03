# My Next.js Blog (Redux Toolkit + Redux-Saga)

## Live Link: https://my-nextjs-blog-site.netlify.app/ 



A clean, full‑featured blog demonstrating **Next.js** (Pages Router), **Redux Toolkit**, **Redux‑Saga**, API routes, SSR, SSG, protected routes, and Tailwind CSS.

## ✨ Features
- Pages: Home, About, Contact, Blog List, Blog Detail, Login, **Dashboard (protected)**
- **API Routes** proxy to DummyJSON for Auth + Posts
- **SSR** on Home (`getServerSideProps`), **SSG** for dynamic post pages (`getStaticProps`/`getStaticPaths`)
- **Redux Toolkit** for state, **Redux‑Saga** for side effects
- Loading & error states, modular components (Button, Card, ItemList, Navbar, Loader)
- Tailwind CSS styling, responsive, professional UI
- Route protection via **httpOnly cookie** + server redirects (`getServerSideProps`)
- Dynamic import for large components

## 🧰 Tech
Next.js 14 (pages router), React 18, RTK, Redux‑Saga, Tailwind, next‑redux‑wrapper

## 📦 Getting Started
```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build & start
npm run build && npm start
```

> Requires internet to reach DummyJSON (`https://dummyjson.com`). You can adjust the base URL in `.env.local`.

## 🔐 Auth Demo
The login page POSTs to `/api/auth/login`, which proxies to DummyJSON auth. Successful logins set an **httpOnly** cookie (`token`).  
Try demo creds: **kminchelle / 0lelplR**.

- Protected route: `/dashboard` (SSR checks cookie and redirects to `/login` if missing)

## 🗂 Structure
```
my-nextjs-blog/
├── components/
│   ├── Button/
│   ├── Card/
│   ├── ItemList/
│   ├── Loader/
│   └── Navbar/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── logout.js
│   │   └── posts/
│   │       ├── [id].js
│   │       └── index.js
│   ├── blog/
│   │   ├── [id].js      # SSG
│   │   └── index.js     # Saga fetch
│   ├── _app.js
│   ├── about.js
│   ├── contact.js
│   ├── dashboard.js     # Protected
│   ├── index.js         # SSR
│   └── login.js
├── services/
│   ├── authService.js
│   └── postService.js
├── store/
│   ├── index.js
│   ├── rootSaga.js
│   ├── sagas/
│   │   ├── authSaga.js
│   │   └── postsSaga.js
│   └── slices/
│       ├── authSlice.js
│       └── postsSlice.js
├── utils/
│   ├── api.js
│   └── helpers.js
├── public/
│   └── images/
│       └── cover.svg
├── styles/
│   └── globals.css
├── .env.local
├── jsconfig.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## 🧪 Notes
- State persists across page transitions (client-side). Auth persists via cookie between refreshes.
- Replace styles and components as needed for your brand.
- Add tests, E2E, and CI as bonus improvements.
