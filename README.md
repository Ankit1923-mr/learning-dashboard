# LearnOS — Next-Gen Student Dashboard

A futuristic, dark-mode learning dashboard built as a frontend internship challenge. Features live data from Supabase, hardware-accelerated animations via Framer Motion, and a clean Bento Grid layout.

**Live Demo:** [learning-dashboard-two-beta.vercel.app](https://learning-dashboard-two-beta.vercel.app)


## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework + Server Components |
| Supabase | PostgreSQL database + BaaS |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| TypeScript | Type safety |
| Vercel | Deployment |

---

## Features

- **Bento Grid Layout** — responsive card-based dashboard
- **Live Supabase Data** — courses fetched server-side via RSC
- **Staggered Animations** — tiles fade + slide in sequentially on load
- **Spring Physics** — hover states use `type: "spring"` for natural feel
- **Animated Progress Bars** — fill from 0 to value on mount
- **Collapsible Sidebar** — with `layoutId` active pill animation
- **Activity Grid** — GitHub-style contribution heatmap
- **Skeleton Loaders** — pulsing placeholders during data fetch
- **Error Handling** — graceful fallback if Supabase is unreachable
- **Fully Responsive** — sidebar on desktop, bottom nav on mobile

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font, metadata
│   ├── page.tsx            # Dashboard (Server Component)
│   ├── loading.tsx         # Global skeleton fallback
│   ├── courses/
│   │   ├── page.tsx        # Courses list (Server Component)
│   │   └── CoursesClient.tsx # Search + filter (Client Component)
│   ├── progress/
│   │   └── page.tsx        # Weekly chart + milestones
│   └── settings/
│       └── page.tsx        # Account, notifications, appearance
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Collapsible nav with layoutId
│   │   └── BottomNav.tsx   # Mobile bottom navigation
│   ├── tiles/
│   │   ├── HeroTile.tsx    # Welcome + streak tile
│   │   ├── CourseCard.tsx  # Dynamic course tile
│   │   ├── ActivityTile.tsx # Contribution heatmap
│   │   └── SkeletonCard.tsx # Loading placeholder
│   └── ui/
│       ├── BentoGrid.tsx   # Stagger container
│       └── ProgressBar.tsx # Animated fill bar
└── lib/
    ├── supabase/
    │   └── server.ts       # Supabase client (server-side)
    └── types.ts            # TypeScript interfaces
```

---

## Architecture Decisions

### Server / Client Component Split

The core principle was: **fetch on the server, animate on the client.**

```
Server Components                Client Components
────────────────────             ──────────────────────
app/page.tsx                     Sidebar.tsx
app/courses/page.tsx             CourseCard.tsx
lib/supabase/server.ts           BentoGrid.tsx
                                 ProgressBar.tsx
                                 ActivityTile.tsx
```

`app/page.tsx` is a Server Component that directly `await`s the Supabase query with no useEffect or client-side fetch. The fetched data is passed as props to Client Components which handle animations. This means zero loading spinners for the initial data — it arrives already rendered in HTML.

### Suspense Boundaries

The `CourseGrid` async function is wrapped in `<Suspense>` so skeleton cards appear immediately while Supabase responds. This keeps the hero tile and activity grid visible instantly.

```tsx
<Suspense fallback={<SkeletonCards />}>
  <CourseGrid />   {/* async server component */}
</Suspense>
```

### Animations — Zero Layout Shifts

All animations use only `transform` and `opacity` — never `width`, `height`, `top`, or `left` on layout-affecting properties. This satisfies the zero layout shift requirement.

```tsx
// Stagger on load
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

// Card hover — spring physics
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Sidebar active pill — layout animation
<motion.div layoutId="sidebar-pill" />
```

### Supabase Security

- Supabase keys are stored in `.env.local` and never committed to git
- The server client is created fresh per request using `@supabase/supabase-js`
- Row Level Security (RLS) is configured on the `courses` table
- Environment variables are prefixed with `NEXT_PUBLIC_` only where required by the client

---

## Database Schema

```sql
create table courses (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null default 0,
  icon_name   text        not null,
  created_at  timestamptz default now()
);
```

### Seed Data

```sql
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',      75, 'Code2'),
  ('System Design Fundamentals',   40, 'Server'),
  ('TypeScript Deep Dive',         90, 'FileCode'),
  ('Database Internals',           55, 'Database');
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Ankit1923-mr/learning-dashboard.git
cd learning-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

See `.env.example` for reference.

---

## Challenges Faced

**Tailwind v4 breaking changes** — The project scaffolded with Tailwind v4 which moved the PostCSS plugin to `@tailwindcss/postcss` and changed the CSS import from `@tailwind base` directives to `@import "tailwindcss"`. This took debugging to resolve.

**Next.js 15 async cookies** — The `cookies()` API became async in Next.js 15, which broke the standard `@supabase/ssr` setup. Resolved by using `@supabase/supabase-js` directly since the app has no auth requirements — only public read access to course data.

**Hydration mismatch on ActivityTile** — The contribution grid used `Math.random()` at module level, causing server/client HTML mismatches. Fixed by moving grid generation into a `useEffect` so it only runs client-side.

**RLS blocking Supabase reads** — Supabase enables Row Level Security by default with no policies, silently returning empty arrays. Resolved by adding a public read policy on the courses table.

---

## Responsive Behavior

| Breakpoint | Sidebar | Grid |
|---|---|---|
| Desktop > 1024px | Full sidebar with labels | 3 columns |
| Tablet 768–1024px | Icon-only collapsed sidebar | 2 columns |
| Mobile < 768px | Bottom navigation bar | 1 column |

---

## License

MIT — built for the Andaz Web Challenge frontend internship.