# Verse Newcomer's Guide 🚀

An interactive, responsive, and welcoming single-page onboarding web application designed specifically for newcomers joining the **Verse Community**. Inside, explorers can learn about community values, track local onboarding progress, custom-generate their Citizen Passport credential badge, bookmark link platforms, search FAQs, and submit draft questions to community guides.

---

## 🎨 Design Theme & Core Pillars

- **Visual Vibe**: Space-age modern deep purple and celestial teal custom gradients (`#07080d` canvas) with elegant typography pairings (Outfit for display, Inter for body, JetBrains Mono for system node indicators).
- **Interactive Passport**: Step 1 enables users to initialize a unique retro profile badge with their call-sign and interests, rendering an authenticated scanner element.
- **Onboarding Progress Checklist**: Marks tasks completed, tracks percentage, and unboxes starter packs. State is preserved across reloads via browser `localStorage`.
- **Searchable Hubs & FAQ**: Instant keyword searching over FAQs and external links; users can click a button to favorite resources directly onto their private dashboard.
- **Sherpa Telegram Companion**: A mock live helpdesk terminal where users choose a query topic and receive personalized, warm guides advice from community leaders.

---

## 📂 Code Architecture

To keep the project clean, modular, and easy to maintain, the logic is separated:
- `/src/data.ts`: Contains all structured copy (text, counts, steps, advice, FAQs, links, events). Customize this file to change site content without touching React code.
- `/src/components/PassportGenerator.tsx`: Interactive passport card and binary matrix generator.
- `/src/components/StepsTracker.tsx`: Onboarding checklist progress panel, greeting copy-paste drafting tool, and starter unboxing container.
- `/src/components/ResourcesGrid.tsx`: Quick-search grid allowing resource bookmarks.
- `/src/components/FaqSection.tsx`: Searchable categorical FAQ accordion.
- `/src/components/EventsList.tsx`: Community live events and simulated push notifications.
- `/src/components/SherpaHelpdesk.tsx`: Realistic local companion bot telegram helper.
- `/src/components/Toast.tsx`: Visual micro-toast notification alerts manager.
- `/src/App.tsx`: Sticky navbar, layout grids, back-to-top mechanisms, and global states.
- `/src/index.css`: Google font imports, Tailwind configuration layer, and backdrop glow keyframes.

---

## ⚙️ Content Customization Guide

### 1. Update Core Content & Statistics
To change stats (e.g. Member count), values, rules, or questions, open `/src/data.ts` and modify the arrays:
- `STATS`: Update numerical highlights as the community grows.
- `GETTING_STARTED_STEPS`: Adjust the onboarding flow text and buttons.
- `RESOURCES_LIST`: Add, remove, or modify links to Discord, Wikis, or GitHub repositories.
- `FAQS_LIST`: Customize questions based on what newcomers ask most.
- `COMMUNITY_EVENTS`: Insert your real local dates, times, and hosts.

### 2. Branding & Colors
To tweak the color palette, head to `/src/index.css` or adjust standard tailwind coordinates inside `/src/App.tsx`. Gaseous background gradients utilize custom keyframes (`custom-glow-1` and `custom-glow-2`) to provide a dreamy movement experience.

---

## 🚀 Deployment Instructions

### 1. Host via GitHub Pages

1. Initialize a Git repository, commit code, and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Install the GH-Pages package as a development helper:
   ```bash
   npm install gh-pages --save-dev
   ```
3. Update `package.json` to include deployment scripts and specify the homepage parameter:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -i dist"
   }
   ```
4. Deploy with one command:
   ```bash
   npm run deploy
   ```

### 2. Host via Netlify or Vercel (Automatic CD)

1. Connect your GitHub repository directly to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Select your repository.
3. Configure the build parameters:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` (for Vite projects)
4. Click **Deploy**. Both platforms support automatic deploys whenever you push changes to your `main` branch.

---

*Made with ❤️ for Verse newcomers!*
