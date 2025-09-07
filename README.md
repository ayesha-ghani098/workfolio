# Workfolio – Ayesha Ghani

A modern, fast, and animated developer portfolio built with React + TypeScript + Vite and styled with Tailwind. It features a game-like dashboard hero, major projects with rich details, a Side Missions page powered by the GitHub API, and a centralized Tailwind class map for consistent design.

## ✨ Features

- Modern hero with animated, responsive layout (Framer Motion)
- Centralized Tailwind tokens in `src/styles/tw.ts`
- Major projects with images, problem/approach/outcome, and a details slide
- Side Missions page with GitHub API integration (excludes repos with topic "major")
- Theming tokens and glass/gradient utilities
- React Router with future flags to reduce v7 warnings

## 🧰 Tech Stack

- React 18, TypeScript, Vite 5
- Tailwind CSS 3, shadcn/ui primitives
- Framer Motion animations
- React Router DOM 6
- Lucide icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs on Vite's dev server (default: `http://localhost:5173`).

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Environment Variables

Create a `.env` file at the project root as needed.

Optional (EmailJS for the Contact page):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

These are consumed in `src/lib/email.ts`.

Optional (GitHub API token for higher rate limits on Side Missions):

```env
VITE_GITHUB_TOKEN=ghp_xxx_optional
```

The Side Missions page works without a token, but rate limiting is stricter.

## 🗂️ Project Structure

```text
Workfolio/
  content/
    site-data.json          # All content: hero, major projects, journey, contact
  src/
    components/             # Reusable UI
      ui/                   # shadcn/ui wrappers
      ProjectSlide.tsx      # Modal slide for project details
      GameCard.tsx          # Game-style card
      Navbar.tsx, Footer.tsx
    pages/
      Dashboard.tsx         # Hero + profile showcase
      Projects.tsx          # Major projects + (full) Side Missions section
      SideMissions.tsx      # GitHub-powered side missions with pagination
      Journey.tsx, Contact.tsx, Lab.tsx
    lib/
      data.ts               # Typed content loader
      email.ts              # EmailJS integration
      utils.ts              # Helpers
    styles/
      tw.ts                 # Centralized Tailwind class map
    main.tsx                # RouterProvider with future flags
    App.tsx                 # Route definitions
  public/                   # Static assets (if any)
```

## 🧱 Content Management

All editable content lives in `content/site-data.json`.

- Update contact info, hero text, and skills
- Add/modify major projects (supports `imageKey`, `description`, `tags`, `liveUrl`, `githubUrl`)
- Journey entries and side missions fallback data

Project images are mapped in `src/pages/Projects.tsx` via `imageMap`. Add your asset (e.g., `workfolio.png`) to `src/assets/` and map its `imageKey` to the import.

## 🧭 Routing

`src/main.tsx` uses `createBrowserRouter` with `future.v7_relativeSplatPath` to preempt v7 behavior. App routes are attached under `App.tsx`.

## 🎨 Styling Conventions

- Reusable class names live in `src/styles/tw.ts` (e.g., `tw.cardBorder`, `tw.techChip`, `tw.socialBtn`)
- Prefer `tw.*` tokens over inline class strings
- Global CSS, gradients, and glass utilities are in `src/index.css`

## 🧪 Tips for Sharp Images

- Project thumbnails use a fixed thumbnail size and `object-cover`
- Avoid applying `backdrop-filter` to image containers to prevent softness

## ☁️ Deployment

Any static host works. Common options:

- Vercel: Connect repo → set env vars → deploy
- Netlify: `npm run build` → deploy `dist/`

## 📜 Scripts

- `dev` – start dev server
- `build` – type-check then build with Vite
- `preview` – preview the production build
- `lint` – lint codebase

## 🧭 Make it your own (Template Guide)

You can use this repo as a starting point for your own portfolio.

1. Fork or Use this template

- Fork this repository or click “Use this template” on GitHub
- Clone locally and install deps

```bash
git clone <your-fork-url>
cd ayesha-portfolio
npm install
```

2. Update your content in `content/site-data.json`

- `hero`: name, tagline, one-liner
- `contact`: email, LinkedIn, GitHub, phones, Topmate, etc.
- `majorProjects`: fill in `title`, `problem`, `approach`, `outcome`, `description`, `tags`, `liveUrl`, `githubUrl`, and `imageKey`
- `journey`, `skills`, `sideMissions` fallback

3. Add project images and map them

- Place images in `src/assets/` (e.g., `myproject.png`)
- Map the key in `src/pages/Projects.tsx` under `imageMap`

```ts
const imageMap: Record<string, string> = {
  // existing entries…
  myproject: myProjectImg,
};
```

4. Update GitHub username for Side Missions

- In `src/pages/SideMissions.tsx`, change the username in the fetch URL

```ts
"https://api.github.com/users/<your-username>/repos?per_page=100";
```

- Optional: add `VITE_GITHUB_TOKEN` in `.env` to raise rate limits

5. Configure EmailJS (optional, for Contact page)

- Add the following to `.env`

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

6. Replace assets used in the hero

- Swap profile image at `src/assets/pic.jpeg`
- Replace the left visual media (e.g., `TECH.png`) in `src/pages/Dashboard.tsx`

7. Customize styling

- Tweak tokens/utilities in `src/styles/tw.ts`
- Adjust global colors/gradients in `src/index.css`

8. Run and deploy

```bash
npm run dev         # develop
npm run build       # production build
npm run preview     # preview prod build
```

Deploy the `dist/` folder (Netlify) or connect the repo to Vercel.

## 🤝 Contributing

PRs are welcome for UX polish, accessibility, and new Side Missions. Please keep to the `tw.ts` token system and TypeScript types.

## 📄 License

MIT

## 📬 Contact

- Email: ayesha.ghani.ga@gmail.com
- GitHub: https://github.com/ayesha-ghani098
- LinkedIn: https://www.linkedin.com/in/ayeshaghani098/
- Topmate: https://topmate.io/ayesha_ghani/
