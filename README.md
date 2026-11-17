# 🚀 AI Analytics Dashboard

A production-grade, real-time analytics dashboard built with **Next.js 15**, **React Server Components**, **TypeScript**, and **Tailwind CSS**. Features streaming UI with Suspense boundaries, dark mode, responsive design, and AI-powered business insights.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

---

## ✨ Key Features

### 🏗️ Architecture
- **React Server Components (RSC)** — Data fetching happens on the server, zero client-side waterfalls
- **Streaming UI with Suspense** — Each dashboard section loads independently with skeleton placeholders
- **Server/Client Component Split** — Only interactive components ship JavaScript to the browser
- **Type-Safe End-to-End** — Full TypeScript coverage with strict mode enabled

### 📊 Dashboard Sections
- **Metric Cards** — Key KPIs with trend indicators (revenue, users, conversion, session time)
- **Revenue & Profit Chart** — Interactive area chart with gradient fills using Recharts
- **Recent Activity Feed** — Real-time activity stream with color-coded event types
- **AI Insights Panel** — Priority-ranked AI-generated business intelligence
- **Active Sessions** — Live user session monitoring with geographic data

### 🎨 Design
- **Dark/Light Mode** — System-aware theme with manual toggle and localStorage persistence
- **Responsive Layout** — Adaptive grid from mobile to 4K displays
- **Collapsible Sidebar** — Full navigation with icon-only collapsed state
- **Custom Design System** — CSS custom properties for consistent theming
- **Shimmer Loading Skeletons** — Polished loading states that match the final layout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with App Router and Server Components |
| **React 19** | UI library with Suspense and streaming support |
| **TypeScript 5.7** | Static type checking and developer tooling |
| **Tailwind CSS 3.4** | Utility-first CSS framework |
| **Recharts** | Composable charting library for React |
| **Lucide React** | Beautiful, consistent icon set |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nextjs-ai-dashboard.git
cd nextjs-ai-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + CSS custom properties
│   ├── layout.tsx           # Root layout (Server Component)
│   └── page.tsx             # Dashboard page with Suspense boundaries
├── components/
│   ├── theme-provider.tsx   # Dark/light mode context (Client)
│   ├── sidebar.tsx          # Collapsible navigation (Client)
│   ├── header.tsx           # Search bar + theme toggle (Client)
│   ├── metrics-grid.tsx     # KPI metric cards (Server)
│   ├── revenue-chart.tsx    # Chart wrapper (Server)
│   ├── revenue-chart-client.tsx  # Recharts visualization (Client)
│   ├── activity-feed.tsx    # Activity stream (Server)
│   ├── ai-insights-panel.tsx # AI insights display (Server)
│   ├── active-sessions.tsx  # Live sessions table (Server)
│   └── skeletons/           # Loading skeleton components
│       ├── metrics-skeleton.tsx
│       ├── chart-skeleton.tsx
│       └── list-skeleton.tsx
└── lib/
    ├── data.ts              # Data fetching functions (simulated API)
    ├── types.ts             # TypeScript type definitions
    └── utils.ts             # Utility functions (cn class merger)
```

---

## 🧠 Architecture Decisions

### Why React Server Components?
Server Components eliminate the need to ship data-fetching logic to the browser. The metrics, charts, and insights are fetched and rendered on the server — only the interactive bits (theme toggle, sidebar collapse, chart tooltips) run as client components. This results in:
- **Smaller JavaScript bundles** sent to the browser
- **No loading spinners for initial data** — HTML arrives ready
- **Streaming with Suspense** — sections appear as their data resolves

### Why Suspense Boundaries?
Each dashboard section is wrapped in its own `<Suspense>` boundary with a matching skeleton loader. This means:
- Fast sections render immediately
- Slow sections show a polished loading state
- The page never blocks on the slowest data source

### Why CSS Custom Properties for Theming?
Instead of Tailwind's `dark:` prefix on every element, we use CSS variables that change globally. This means:
- One place to update colors
- Easier to add new themes (e.g., high-contrast mode)
- Better performance (fewer CSS classes generated)

---

## 📈 Skills Demonstrated

- ✅ **TypeScript** — Strict mode, interfaces, generics, type-safe props
- ✅ **Next.js 15 App Router** — Layouts, Server Components, Server Actions
- ✅ **React 19 Suspense** — Streaming SSR with progressive rendering
- ✅ **Tailwind CSS** — Custom design system, responsive design, dark mode
- ✅ **Component Architecture** — Server/Client split, composition patterns
- ✅ **Data Visualization** — Interactive charts with Recharts
- ✅ **Accessibility** — ARIA labels, keyboard navigation, semantic HTML
- ✅ **Performance** — Code splitting, minimal client JS, optimized rendering

---

## 📄 License

MIT License — feel free to use this as a template for your own projects.

---

Built with 💙 by a developer who believes in shipping production-quality code.
