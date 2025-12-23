# Quit Fap Pal Website

Official landing page for the Quit Fap Pal iOS app.

## 📁 Project Structure

```
quitfappal-website/
├── index.html          # Main landing page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
├── styles.css          # Complete stylesheet
├── script.js           # JavaScript (interactions, form)
├── CNAME              # Custom domain config
├── assets/
│   ├── mascot-face.png       # ✅ Included
│   ├── mascot-superhero.png  # ✅ Included
│   ├── mascot-fire.png       # ✅ Included
│   ├── mascot-worried.png    # ✅ Included
│   ├── favicon.png           # ⚠️ YOU NEED TO ADD
│   ├── apple-touch-icon.png  # ⚠️ YOU NEED TO ADD
│   ├── app-screenshot.png    # ⚠️ YOU NEED TO ADD
│   ├── screenshot-home.png   # ⚠️ YOU NEED TO ADD
│   ├── screenshot-tools.png  # ⚠️ YOU NEED TO ADD
│   ├── screenshot-progress.png # ⚠️ YOU NEED TO ADD
│   └── og-image.png          # ⚠️ YOU NEED TO ADD (for social sharing)
└── README.md
```

---

## 🖼️ ASSETS YOU NEED TO ADD

### Required Images:

| Image | Size | Description |
|-------|------|-------------|
| `favicon.png` | 32x32 | Small icon for browser tab |
| `apple-touch-icon.png` | 180x180 | iOS home screen icon |
| `app-screenshot.png` | 390x844 | Main screenshot for hero (iPhone 14 Pro size) |
| `screenshot-home.png` | 390x844 | Home screen screenshot |
| `screenshot-tools.png` | 390x844 | Tools/coping screen screenshot |
| `screenshot-progress.png` | 390x844 | Progress/stats screen screenshot |
| `og-image.png` | 1200x630 | Social sharing preview image |

### How to create these:

1. **Screenshots**: Use Xcode Simulator → iPhone 14 Pro → Take screenshots
2. **Favicon**: Resize your app icon to 32x32
3. **Apple Touch Icon**: Resize app icon to 180x180
4. **OG Image**: Create a 1200x630 image with app preview and mascot

---

## 📧 CONTACT FORM SETUP

The contact form needs a backend to send emails without exposing your address. Two free options:

### Option 1: Web3Forms (Recommended - Easiest)

1. Go to https://web3forms.com
2. Enter your email: `7anon777@gmail.com`
3. You'll receive an access key by email
4. Open `index.html` and find the contact form
5. Add this hidden input inside the form (after the opening `<form>` tag):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
6. Change the form submission URL in `script.js`:
   ```javascript
   const response = await fetch('https://api.web3forms.com/submit', {
   ```

### Option 2: Formspree

1. Go to https://formspree.io
2. Sign up (free tier: 50 submissions/month)
3. Create a new form
4. Get your form endpoint (looks like: `https://formspree.io/f/xxxxxxxx`)
5. Replace `YOUR_FORM_ID` in `script.js` with your form ID

---

## 🚀 DEPLOYMENT TO GITHUB PAGES

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `quitfappal-website` (or `quitfappal.com`)
3. Make it **Public**
4. Don't initialize with README (we have one)
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag all files from the `quitfappal-website` folder
3. Commit message: "Initial website"
4. Click "Commit changes"

**Option B: Using Git Command Line**
```bash
cd quitfappal-website
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quitfappal-website.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab)
3. Scroll to **Pages** (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait 2-3 minutes for deployment
8. Your site will be at: `https://YOUR_USERNAME.github.io/quitfappal-website/`

---

## 🌐 CUSTOM DOMAIN SETUP (Squarespace → GitHub Pages)

### Step 1: Configure Squarespace DNS

1. Log in to Squarespace
2. Go to **Domains** → Select `quitfappal.com`
3. Click **DNS Settings** or **Advanced DNS Settings**
4. **Delete** any existing A records or CNAME records for @ or www

5. Add these **A Records** (for root domain):
   | Type | Host | Data |
   |------|------|------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

6. Add this **CNAME Record** (for www subdomain):
   | Type | Host | Data |
   |------|------|------|
   | CNAME | www | YOUR_USERNAME.github.io |

   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Configure GitHub Pages Custom Domain

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Custom domain", enter: `quitfappal.com`
4. Click **Save**
5. Check ✅ **Enforce HTTPS** (after DNS propagates)

### Step 3: Wait for DNS Propagation

- DNS changes can take 1-48 hours (usually 1-2 hours)
- Check status at: https://dnschecker.org/#A/quitfappal.com
- Once propagated, your site will be live at https://quitfappal.com

---

## ✅ DEPLOYMENT CHECKLIST

### Before Deploying:
- [ ] Add all screenshots to `/assets/` folder
- [ ] Add favicon.png (32x32)
- [ ] Add apple-touch-icon.png (180x180)
- [ ] Add og-image.png (1200x630)
- [ ] Set up Web3Forms or Formspree for contact form
- [ ] Update form endpoint in script.js
- [ ] Test all links work locally

### After Deploying:
- [ ] Verify site loads at GitHub Pages URL
- [ ] Configure custom domain DNS in Squarespace
- [ ] Add custom domain in GitHub Pages settings
- [ ] Enable HTTPS (after DNS propagates)
- [ ] Test contact form submission
- [ ] Test on mobile devices
- [ ] Check all images load correctly
- [ ] Verify Privacy Policy and Terms links work

---

## 🔧 COMMON ISSUES

### Images not loading
- Make sure filenames match exactly (case-sensitive)
- Check file extensions (.png, not .PNG)
- Verify files are in `/assets/` folder

### Custom domain not working
- DNS takes time to propagate (wait 1-2 hours)
- Verify A records are correct in Squarespace
- Make sure CNAME file exists in repository root
- Check GitHub Pages shows your custom domain

### Contact form not sending
- Verify form endpoint URL is correct
- Check Web3Forms/Formspree dashboard for submissions
- Look for errors in browser console (F12)

### Site not updating
- GitHub Pages can take 2-5 minutes to update
- Try clearing browser cache (Ctrl+Shift+R)
- Check Actions tab in GitHub for build status

---

## 📱 APP STORE LINK

Once your app is live, update the download buttons:

1. Open `index.html`
2. Find all `href="#download"` or `href="#"` on App Store buttons
3. Replace with your App Store URL:
   ```html
   href="https://apps.apple.com/app/quit-fap-pal/id123456789"
   ```

---

## 📞 SUPPORT

If you need help:
- Website issues: Check this README
- DNS issues: Contact Squarespace support
- GitHub Pages: Check GitHub documentation

---

Made with 💜 for Quit Fap Pal
