# Petrolheads Landing Page - Product Requirements Document

## Project Overview

**Project Name:** Petrolheads Landing Page  
**Community:** Petrolheads - Turkish Automotive Enthusiast Community  
**Current Size:** 23,000+ Twitter followers  
**Tagline:** "Driving Spirit"  
**Future Phase:** Driving Club Membership Application (out of scope for MVP)

---

## Brand Identity

### Logo Assets
- **Primary Logo:** Circular tire badge with retro gas pump mascot character holding fuel nozzle
- **Secondary Logo:** Horizontal banner with checkered flag motif
- **Mascot:** Anthropomorphic vintage gas pump with "PH" branding on top gauge

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Red | `#E31E24` | Accents, CTAs, highlights |
| Primary Black | `#1A1A1A` | Backgrounds, text, headers |
| Pure White | `#FFFFFF` | Text on dark, clean spaces |
| Dark Gray | `#2D2D2D` | Secondary backgrounds |

### Typography
| Font | Usage | Style |
|------|-------|-------|
| **Race Sport** | Headlines, hero text, navigation | Bold, italic racing aesthetic |
| **Futura PT Bold** | Body text, subheadings, buttons | Clean, geometric, modern |

### Visual Motifs
- Checkered racing flags (black/red pattern)
- Tire tread texture
- Speed lines / motion blur effects
- Retro gas station aesthetic
- Racing stripes

---

## Technical Stack

- **Framework:** Next.js 14+ with App Router (or plain React + Vite)
- **Styling:** Tailwind CSS v3+
- **Language:** TypeScript
- **Animations:** Framer Motion / CSS animations
- **Fonts:** Google Fonts or self-hosted (Race Sport may need custom hosting)
- **Deployment:** Vercel (recommended)

---

## Design Direction

### Aesthetic Vision
**Style:** Retro-futuristic racing meets modern brutalist web design

The landing page should feel like stepping into a high-end car showroom mixed with vintage Americana gas station vibes. Dark, moody backgrounds with dramatic red accents. The Porsche 911 GT3 RS serves as the hero visual - a symbol of pure driving passion.

### Key Design Elements

1. **Hero Section with 3D Car**
   - Full-viewport hero with Porsche 911 GT3 RS image/3D model
   - Car should rotate/pan subtly on scroll
   - Dark gradient backdrop with subtle tire tread texture
   - Dramatic lighting (rim lighting effect on car)
   - Hero text: "PETROL HEADS" in Race Sport font
   - Subtext: "DRIVING SPIRIT" in Futura PT Bold

2. **Scroll-Triggered Animations**
   - As user scrolls, the car rotates revealing different angles
   - Parallax depth effects on background elements
   - Staggered reveal animations for content sections
   - Speed lines that animate on scroll direction

3. **Section Transitions**
   - Checkered flag patterns as section dividers
   - Diagonal cuts between sections
   - Red accent lines that animate across viewport

---

## Page Structure & Sections

### 1. Navigation (Fixed/Sticky)
- Logo (PH circular badge) on left
- Nav links: Home | About | Community | Gallery | Contact
- Language toggle (TR/EN) - optional
- Dark transparent background, becomes solid on scroll
- Hamburger menu on mobile with full-screen overlay

### 2. Hero Section
- Full viewport height (100vh)
- Porsche 911 GT3 RS as centerpiece (high-res image or 3D)
- "PETROL HEADS" - massive typography, Race Sport font
- "DRIVING SPIRIT" - subtitle underneath
- Scroll indicator (animated chevron)
- Subtle particle effects (sparks/embers) or lens flare
- Background: Dark gradient with subtle motion

### 3. About / Who We Are
- Brief intro to the community
- Key stats displayed prominently:
  - "23,000+" Members
  - "EST. 2023" (or actual year)
  - Turkish flag icon
- Content: "Turkey's premier automotive enthusiast community. United by our love for horsepower, engineering excellence, and the open road."
- Side-by-side layout with dramatic car photography

### 4. What We Do / Features
- Card-based grid layout
- Cards with hover effects (lift, glow, color shift)
- Features:
  - **Community Discussions** - Daily automotive content & debates
  - **Car Spotting** - Share rare finds from Turkish streets
  - **Technical Knowledge** - Engine specs, modifications, reviews
  - **Events & Meets** - Organized drives and gatherings (future)
- Each card has racing-inspired icon or illustration

### 5. Featured Content / Gallery
- Masonry or horizontal scroll gallery
- High-quality automotive photography
- Mix of:
  - Community member cars
  - Exotic car spots
  - Event photos (if available)
- Hover effect: slight zoom, red border accent
- Lightbox functionality on click

### 6. Social Proof / Twitter Feed
- Embedded latest tweets or styled tweet cards
- Follower count display
- "Join the conversation" CTA
- Twitter/X follow button

### 7. Join the Community CTA
- Full-width section with dramatic background
- "BECOME A PETROLHEAD" - large text
- Twitter follow button (primary CTA)
- "Driving Club Coming Soon" - teaser badge
- Email signup for club waitlist (optional)

### 8. Footer
- Logo (horizontal version)
- Social links: Twitter/X, Instagram (if exists)
- Spotify Playlists link (community playlists)
- Copyright notice
- "Made with ❤️ and high octane fuel"

---

## Interaction & Animation Specs

### Scroll Animations
```
- Hero car: rotates 0° to 45° on scroll (first 100vh)
- Content sections: fade-in-up with stagger (100ms delay between elements)
- Stats counters: animate from 0 to final number on viewport entry
- Gallery items: staggered scale-in animation
```

### Hover Effects
```
- Navigation links: red underline slide-in from left
- Buttons: scale(1.05) + subtle glow
- Cards: translateY(-8px) + shadow increase
- Gallery images: scale(1.05) + red border
```

### Micro-interactions
```
- Logo pulse on load
- Scroll indicator bounce animation
- Checkered flag pattern subtle animation
- Cursor: custom crosshair on interactive elements (optional)
```

---

## Responsive Breakpoints

| Breakpoint | Width | Considerations |
|------------|-------|----------------|
| Mobile | < 640px | Stack all content, full-width cards, simplified hero |
| Tablet | 640px - 1024px | 2-column layouts, reduced car rotation effect |
| Desktop | 1024px - 1440px | Full experience |
| Large | > 1440px | Max-width container, scale up hero elements |

---

## Assets Required

### Images (Source from Unsplash/Pexels with dark, moody automotive themes)
- Porsche 911 GT3 RS (hero) - multiple angles if doing scroll rotation
- Generic luxury/sports car shots for backgrounds
- Turkish automotive culture photos (if available)
- Abstract speed/motion blur backgrounds

### Icons
- Custom racing-themed icons or Lucide/Heroicons
- Social media icons (Twitter/X, Instagram)
- Arrow/chevron animations

### Fonts
- Race Sport (needs to be sourced - may need alternative like "Racing Sans One" or "Faster One" from Google Fonts)
- Futura PT Bold (Google Fonts alternative: "Jost" or "Nunito Sans Bold")

---

## Performance Requirements

- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Image optimization: WebP format, lazy loading
- Font loading: font-display: swap

---

## SEO Requirements

- Meta title: "Petrolheads - Turkey's Premier Automotive Community | Driving Spirit"
- Meta description: "Join 23,000+ Turkish car enthusiasts. Petrolheads is the home for those who live and breathe automotive culture."
- Open Graph tags for Twitter/social sharing
- Structured data for organization

---

## Copy & Content (English)

### Hero
```
PETROL HEADS
DRIVING SPIRIT

Where Turkish automotive passion ignites.
```

### About
```
WHO WE ARE

Born from a shared obsession with horsepower, engineering, and the thrill of the drive. Petrolheads is Turkey's fastest-growing automotive community — 23,000+ members strong and counting.

We're not just car enthusiasts. We're a family united by the smell of high-octane fuel and the sound of engines roaring.
```

### Features
```
WHAT DRIVES US

🏁 Daily Discussions - From classic restorations to modern supercars
📸 Street Spots - The rarest machines caught on Turkish roads  
🔧 Technical Deep-Dives - Specs, mods, and everything under the hood
🚗 Future Events - Organized drives and meets (coming soon)
```

### CTA
```
READY TO JOIN THE CREW?

Follow us on X and become part of Turkey's most passionate automotive community.

[FOLLOW @PETROLHEADS]

🔒 Exclusive Driving Club - Coming 2025
```

### Footer
```
PETROL HEADS
Driving Spirit Since 2023

Made with ❤️ and high octane fuel in Istanbul
```

---

## Out of Scope (Future Phases)

- [ ] Driving Club membership application form
- [ ] Member profiles / login system
- [ ] Event calendar integration
- [ ] Merch store
- [ ] Forum / discussion board
- [ ] Multi-language support (TR/EN toggle)

---

## File Structure (Suggested)

```
petrolheads-landing/
├── public/
│   ├── images/
│   │   ├── hero-car.webp
│   │   ├── logo-badge.png
│   │   ├── logo-horizontal.png
│   │   └── gallery/
│   ├── fonts/
│   │   └── race-sport.woff2
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Features.tsx
│   │   ├── Gallery.tsx
│   │   ├── SocialProof.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── fonts.css
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Tailwind Config Additions

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ph-red': '#E31E24',
        'ph-black': '#1A1A1A',
        'ph-dark': '#2D2D2D',
      },
      fontFamily: {
        'race': ['Race Sport', 'sans-serif'],
        'futura': ['Futura PT', 'Jost', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(227, 30, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(227, 30, 36, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Success Metrics

- Page load time under 3 seconds
- Mobile-responsive on all major devices
- Twitter follow button click-through rate tracking
- Scroll depth analytics
- Time on page > 30 seconds average

---

## References & Inspiration

- Porsche official website (dramatic car photography)
- Top Gear magazine aesthetic
- Vintage American gas station imagery
- Modern automotive brand sites (BMW M, AMG, etc.)
- Brutalist web design with racing twist

---

*Document Version: 1.0*  
*Created: December 2025*  
*Author: Petrolheads Team*
