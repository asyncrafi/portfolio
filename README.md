# Rafi (asyncrafi) — Software Engineering & Freelance Portfolio

A production-grade, lightweight, and modern portfolio website engineered specifically to showcase full-stack and mobile applications, attract high-value freelance clients, and provide hiring teams with verifiable technical proof of work.

Built in accordance with the principles from the **Intuit Software Engineering Portfolio Guide**:
- **Problem → Solution → Impact framework** for all showcased projects.
- **Categorized technical skills** (Languages, Frontend/Mobile, Backend/APIs, Databases & Cloud).
- **Interactive Perspective Switcher** (Recruiter View vs Client View).
- **Interactive Scope & Timeline Estimator** for freelance client conversion.
- **GitHub Pages ready**: Zero build step or complex framework required. 100% native HTML5, modern CSS3, and Vanilla JavaScript.

---

## 🚀 Key Features

1. **Dual Perspective Mode (Client vs Recruiter)**:
   - **Client View**: Focuses on business ROI, speed-to-market, client testimonials, and deliverables.
   - **Recruiter View**: Focuses on system architecture, test coverage, code quality, and technical depth.
2. **Interactive Freelance Project Scope Estimator**:
   - Prospective clients can select platform (Web, Mobile, Backend, Audit), desired features, and delivery velocity.
   - Calculates estimated delivery timeline, recommended stack, and auto-populates the contact form with 1 click.
3. **Deep-Dive Case Study Modals**:
   - Accessible modal window displaying ASCII system architectures, engineering tradeoffs, database design, and verified metrics.
4. **Dark / Light Mode**:
   - Persists user preferences to `localStorage` with automated system `prefers-color-scheme` detection.
5. **Fast & Performant**:
   - Zero framework overhead (no React/Next.js bundle lag).
   - Fast initial paint, responsive down to 320px mobile screens.
   - 1-click email copy with toast feedback.

---

## 📂 Project Structure

```
portfolio/
├── index.html           # Semantic, SEO-optimized HTML5 structure
├── styles.css           # Modern CSS design system, dark/light themes, animations
├── app.js               # Interactive features (estimator, filters, modal, toast)
├── README.md            # Setup & deployment guide
└── assets/
    ├── favicon.svg      # Crisp SVG vector favicon
    ├── hrlynx_dashboard.jpg    # HRLynx showcase mockup
    ├── finflow_dashboard.jpg   # FinFlow fintech analytics mockup
    └── mobile_app_showcase.jpg # Cross-platform mobile app mockup
```

---

## 💻 Running Locally

### Option 1: Open Directly in Browser
Double-click `index.html` or open it with your favorite browser.

### Option 2: Run with Python HTTP Server
```bash
cd /home/r4fi/.gemini/antigravity-ide/scratch/portfolio
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

Deploy your portfolio in under 2 minutes:

1. **Initialize Git in this directory**:
   ```bash
   cd /home/r4fi/.gemini/antigravity-ide/scratch/portfolio
   git init
   git add .
   git commit -m "Initial commit: Software engineering & freelance portfolio"
   ```

2. **Create a GitHub repository**:
   - Name it `portfolio` (or `asyncrafi.github.io` if you want it as your primary user site).

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/asyncrafi/<your-repo-name>.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - On GitHub, go to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch: `main` and folder: `/ (root)`.
   - Click **Save**. Your portfolio will be live at `https://asyncrafi.github.io/<your-repo-name>/`!

---

## 🛠️ Setting as Active Workspace

In Antigravity IDE, open the folder:
`/home/r4fi/.gemini/antigravity-ide/scratch/portfolio`
to set it as your active workspace for easy editing and git tracking.
