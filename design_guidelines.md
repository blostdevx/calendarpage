# Design Guidelines: Hacking & Cybersecurity Events Platform

## Design Approach

**Reference-Based Approach:** Drawing inspiration from modern tech platforms like GitHub Dark Mode, Vercel's design system, and cybersecurity conference sites (DEF CON, Black Hat). The aesthetic balances professional credibility with hacker culture—dark, sleek, with strategic neon accents that evoke terminal interfaces and digital security themes.

**Core Principle:** Create a premium dark interface that feels both cutting-edge and trustworthy, appealing to cybersecurity professionals while maintaining visual excitement through controlled neon highlights and smooth animations.

---

## Color Palette

### Dark Mode (Primary)
- **Background Base:** 220 25% 8% (deep slate)
- **Surface Layer:** 220 20% 12% (elevated cards)
- **Surface Hover:** 220 18% 16% (interactive states)

### Accent Colors
- **Primary Cyan:** 190 95% 55% (electric cyan for CTAs and highlights)
- **Secondary Magenta:** 320 90% 60% (magenta for badges and accents)
- **Tertiary Purple:** 270 80% 65% (purple for gradients)
- **Success Green:** 150 80% 50% (online/active indicators)
- **Warning Amber:** 35 95% 60% (urgent events)

### Text Hierarchy
- **Primary Text:** 0 0% 98% (near white)
- **Secondary Text:** 220 10% 70% (muted gray)
- **Tertiary Text:** 220 10% 50% (subdued)

### Gradient Applications
- **Hero Gradient:** Linear from 220 25% 8% to 270 40% 15% (top to bottom)
- **Card Glow:** Radial cyan/magenta blur at 5% opacity on hover
- **Accent Lines:** 1px gradients transitioning cyan → magenta

---

## Typography

### Font Families
- **Primary (Headers):** 'Space Grotesk' or 'Inter' via Google Fonts - modern, technical, professional
- **Secondary (Body):** 'Inter' - excellent readability
- **Monospace (Code/Tech):** 'JetBrains Mono' - for event IDs, technical details, terminal-style elements

### Type Scale
- **Hero Title:** text-5xl md:text-7xl font-bold (56-72px)
- **Section Headers:** text-3xl md:text-4xl font-semibold (36-48px)
- **Event Titles:** text-xl md:text-2xl font-semibold (24-30px)
- **Body Large:** text-lg (18px)
- **Body:** text-base (16px)
- **Caption:** text-sm (14px)
- **Micro:** text-xs (12px) for tags/metadata

---

## Layout System

### Spacing Primitives
**Core Units:** Tailwind spacing of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Section Padding:** py-20 md:py-32 (vertical breathing room)
- **Card Padding:** p-6 md:p-8
- **Element Gaps:** gap-4 to gap-8
- **Container Max-Width:** max-w-7xl with px-4 md:px-8

### Grid Structures
- **Event Cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- **Calendar Grid:** 7-column layout for days of week
- **Feature Stats:** grid-cols-2 md:grid-cols-4 for metrics
- **Contact Split:** md:grid-cols-2 (form + info)

---

## Component Library

### 1. Hero Section (Full Viewport)
- **Height:** min-h-screen with gradient background
- **Content:** Centered title with glowing text effect, subtitle, primary CTA with backdrop-blur
- **Visual:** Animated grid pattern overlay (subtle lines), floating particles effect
- **Featured Event:** Glassmorphic card with countdown timer (days:hours:mins), event thumbnail, "Register Now" CTA

### 2. Event Cards (Glassmorphism Style)
- **Base:** bg-white/5 backdrop-blur-md border border-white/10
- **Hover State:** transform scale-105, shadow glow (cyan 20% opacity), border-cyan-500/30
- **Structure:**
  - Event image/logo (16:9 ratio, rounded-t-xl)
  - Badge cluster: Modalidad (online/presencial), Nivel (beginner/intermediate/advanced), Category tag
  - Event title (text-xl font-semibold)
  - Date/time with calendar icon (text-cyan-400)
  - Location with map pin icon
  - Description preview (2 lines truncated)
  - Bottom action bar: "Más Info" link + "Add to Google Calendar" button (outline, cyan)

### 3. Monthly Calendar View
- **Header:** Month/Year navigation with arrow buttons, "Hoy" quick return
- **Grid:** 7x5/6 grid, day numbers in circles
- **Event Indicators:** Colored dots below dates (cyan=CTF, magenta=Conference, purple=Workshop)
- **Interaction:** Click date to filter events, hover shows event count tooltip
- **Design:** bg-slate-900/50, highlighted current day with cyan ring

### 4. Filtering System (Sticky Sidebar or Top Bar)
- **Search:** Input with magnifying glass icon, placeholder "Buscar eventos..."
- **Filters:** Pill-style toggles for Categories, Countries, Modality, Level
- **Active State:** bg-cyan-500 text-black for selected filters
- **Clear All:** Small text link in cyan

### 5. Google Maps Integration
- **Container:** Rounded-2xl overflow-hidden, aspect-video
- **Dark Theme:** Google Maps styled with dark mode JSON
- **Markers:** Custom cyan/magenta pins for event locations
- **Info Windows:** Glassmorphic popup with event name, date, "Ver Detalles" link

### 6. Contact Section (Two-Column)
- **Left Column:** Contact form with floating label inputs, glassmorphic styling
- **Right Column:** 
  - Phone: +XX XXX XXX XXX with phone icon
  - Email: contact@domain.com with envelope icon
  - Business hours with clock icon
  - Social media icons (outlined, hover fill cyan)

### 7. Footer (Rich, Multi-Section)
- **Top Row:** Logo + tagline, Quick Links (Inicio, Eventos, Contacto), Social Icons (Twitter, LinkedIn, GitHub, Discord)
- **Middle Row:** "Eventos Destacados" with logos (BSides, DEF CON, Ekoparty, Black Hat) as grayscale images, hover to color
- **Bottom Row:** Copyright, Privacy Policy, Terms, "Hecho con ❤️ por la comunidad hacker"
- **Styling:** bg-slate-950 border-t border-cyan-500/20

### 8. Statistics Banner
- **Layout:** 4-column grid of animated counters
- **Metrics:** Total Events (number counter), Countries (globe icon), Upcoming (calendar icon), Active (pulse dot)
- **Animation:** Numbers count up on scroll into view
- **Design:** Glassmorphic cards with gradient borders

### 9. Badges & Tags System
- **Modalidad:** Pill badges - Online (green), Presencial (blue), Híbrido (purple)
- **Nivel:** Outlined badges - Básico (cyan), Intermedio (amber), Avanzado (magenta)
- **Categories:** Small pills with icon + text (CTF, Conference, Workshop, Capture the Flag)

---

## Animations & Interactions

### Page Load
- Staggered fade-in for cards (0.1s delay between each)
- Hero title: Glitch effect on load (1 iteration)
- Numbers/stats: Count-up animation

### Scroll Animations
- Parallax hero background (slower scroll)
- Fade-up for section titles (intersection observer)
- Card entrance: slide-up + fade-in on scroll

### Micro-Interactions
- Button hover: Scale 1.05 + glow shadow
- Card hover: Lift (translateY -4px) + glow border
- Filter pills: Background slide transition
- Calendar dates: Ripple effect on click
- Social icons: Rotate 360° + color fill on hover

### Transitions
- All interactions: transition-all duration-300 ease-in-out
- Color changes: transition-colors duration-200
- Transform: transform transition-transform duration-300

---

## Images

### Hero Section
**Large Hero Image:** Yes - Abstract cybersecurity visualization
- **Description:** Dark digital network nodes connected by glowing cyan lines, floating in space with particle effects. Conveys connectivity and digital security. Subtle matrix-style code rain overlay at 10% opacity.
- **Placement:** Full-width background with gradient overlay (bottom fade to black)
- **Treatment:** Slight blur (2px) to ensure text readability

### Event Cards
- **Event Logos/Images:** Top of each card, 16:9 ratio
- **Fallback:** Gradient placeholder with event icon if no image provided

### Footer
- **Partner Logos:** Grayscale logos of major events (BSides, DEF CON, etc.)
- **Hover Effect:** Transition to full color on hover

---

## Responsive Behavior

### Mobile (< 768px)
- Single column event grid
- Hamburger menu (animated to X)
- Sticky filter bar (collapsible)
- Calendar switches to list view
- Contact form stacks vertically

### Tablet (768px - 1024px)
- 2-column event grid
- Side-by-side calendar + filters
- Footer columns collapse to 2

### Desktop (> 1024px)
- 3-column event grid
- Full layout with sidebar filters
- All sections at max-width-7xl centered

---

## Accessibility & Polish

- Focus rings: cyan outline with 2px offset for keyboard navigation
- High contrast mode: Ensure text meets WCAG AA (4.5:1 ratio)
- Loading states: Skeleton screens with shimmer effect in slate-700/50
- Empty states: Icon + "No hay eventos disponibles" with suggestion to adjust filters
- Error states: Red border with shake animation for form validation