# Founder One

Single page portfolio template for startup founders and indie hackers. Clean white plus slate sections with a solid indigo accent. Metrics first layout with traction stats, ventures, writing, timeline, FAQ and invest contact.

## Features

1. Sticky nav with active link highlight plus hamburger menu under 860px and smooth scroll
2. Hero split with CSS portrait card, animated traction counters and dual call to action
3. Ventures section with 3 large case rows plus writing grid with 3 article cards plus press strip
4. Journey timeline plus single open FAQ accordion powered by vanilla JS
5. Contact form with inline validation plus footer with auto year

## Run

Requires Python 3 only. No build step. No install step.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Expect HTTP 200 for `/index.html`, `/styles.css` and `/script.js`.

## Customize

1. Open `index.html` and replace the name, bio, numbers, ventures, articles, timeline and FAQ text
2. Open `styles.css` and adjust the palette via the CSS variables at the top such as accent, slate and tint
3. Open `script.js` to adjust counter speed, reveal threshold or form rules
4. Portrait art is pure CSS so replace the initials block with an `img` tag if you prefer a photo
5. Deploy free by pushing this folder to GitHub Pages, Netlify Drop or any static host

## Structure

```text
portfolio-founder-one/
  index.html   page markup for all sections
  styles.css   layout, color system and responsive rules
  script.js    nav, reveals, counters, accordion, form validation
  README.md    this guide
```

Palette: white `#FFFFFF`, slate `#0F172A`, slate soft `#F8FAFC`, indigo `#4F46E5`. Type: Inter via Google Fonts. Layout tested at 360px, 768px and 1200px with no horizontal scroll.
