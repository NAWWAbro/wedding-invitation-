# 💍 Kavishka & Samindya — Wedding Invitation Web App

This project is fully configured and ready for **GitHub Pages** hosting!

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com)
2. Click **New Repository**
3. Name it (e.g. `wedding-invitation` or `kavishka-samindya`)
4. Set it to **Public**
5. Click **Create repository**

---

### Step 2: Push this folder to GitHub
Open **PowerShell** or **Terminal** inside this `test web` folder and run:

```bash
git init
git add .
git commit -m "Initial commit for Kavishka & Samindya wedding invitation"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```
*(Replace `<YOUR-USERNAME>` and `<YOUR-REPO-NAME>` with your GitHub details)*

---

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, go to **Settings** (top right tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment** > **Source**, select:
   👉 **GitHub Actions**
4. That's it! The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

Within 1-2 minutes, your website will be live at:
👉 `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 💌 How to Share Personalized Links with Guests

Add `?prefix=...&name=...` to your live GitHub Pages link:

- **Example for Family**:  
  `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?prefix=Mr.%20%26%20Mrs.&name=Hettiarachchi`
- **Example for Doctor**:  
  `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?prefix=Dr.&name=Kanchana`
- **Example for Friends**:  
  `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?name=Devinda%20%26%20Senuri`

Or simply use the **Host Utility: Generate Guest Invitation Links** tool built into the bottom of the webpage to copy and share personalized WhatsApp messages directly!

---

## 📁 File Structure
- `index.html` — Main HTML page (Cinematic Video Intro & Dark Theme Layout)
- `styles.css` — Luxury botanical dark theme styles & animations
- `script.js` — Interactive logic (video entry, audio, countdown, RSVP, guest link generator)
- `weddingConfig.js` — Wedding information (date, times, venue, contacts)
- `vite.config.js` — Configured with `base: './'` for 100% relative GitHub Pages paths
- `.github/workflows/deploy.yml` — Automated GitHub Pages deployment pipeline
- `public/` — Video (`intro_video.mp4`), Audio (`Ed Sheeran - Perfect (Karaoke).mp3`), and botanical graphics
- `dist/` — Pre-built production bundle ready for deployment
