# Portfolio Website: Development Documentation

## Table of Contents
1. Requirements Gathering
2. Designing & Prototyping
3. Planning
4. Development
5. Documentation: SDLC Report

---

## Requirements Gathering

**Purpose**
- Showcase web development skills and projects.
- Demonstrate modern practices and interactivity.
- Act as an updatable professional portfolio.

**Target Audience**
- Recruiters and HR professionals.
- Clients seeking web developers.
- Instructors and fellow developers.

**Content Sections**
1. Hero - Intro and call-to-action.
2. About Me - Background and journey.
3. Skills - Technical competencies.
4. Projects - Portfolio with demos.
5. Contact - Form and social links.

**Layout Choice**
- One-page design for better UX, fast loading, and easy maintenance.

**Design References**
- Brittany Chiang: Layout, animations, dark/light mode.
- Lee Robinson: Minimalist cards and clear typography.
- Sarah Drasner: Particle background and hover effects.

---

## Designing & Prototyping

**Figma Prototype**  
[View Design](#)

**Key Design Choices**
- Single-page layout with sticky navigation.
- Card-based skills and projects.
- Hero section with profile image and CTA.

**Color Scheme**
- Primary: Purple (#7C3AED)
- Background: Light gray / Dark gray
- Contrast-focused text for accessibility

**Typography**
- Font: Inter (weights 300–700)
- Clear hierarchy and readability

**Design Process**
- Wireframe → Mockup → Prototype → User Test → Final Design

---

## Planning

**File Structure**
```

portfolio/
│ index.html
│ styles.css
│ animations.js
│ manifest.json
│ service-worker.js
└── assets/
├── images/
└── icons/

````

**Tech Stack**
- HTML5, CSS3, Tailwind CSS, Vanilla JS, PWA (Service Worker + Manifest)

**Timeline**
- Setup: 1 day – structure, Tailwind, base UI
- Layout: 2 days – header, hero, about, skills
- Interactivity: 3 days – projects, form, theme toggle
- Advanced: 2 days – particles, smooth scroll, PWA
- Testing: 5 days – optimization, SEO, accessibility

---

## Development

**Tailwind Setup**
```html
<script src="https://cdn.tailwindcss.com"></script>
````

**CLI vs CDN**

* Original plan: Use Tailwind via CLI (custom build, tree-shaking)
* Actual implementation: Used Tailwind via CDN for rapid development
* Reason: Faster setup, no build step, ideal for a static portfolio
* Trade-off: Slightly larger CSS file, less tree-shaking, but fully functional

**Set up Tailwind via CLI (if needed)**

1. Install Node.js (if not already)
2. Initialize project: `npm init -y`
3. Install Tailwind: `npm install -D tailwindcss`
   `npx tailwindcss init`
4. Configure input/output in `tailwind.config.js`:

   ```js
   content: ["./*.html"],
   output: "./styles.css"
   ```
5. Build CSS:
   `npx tailwindcss -i ./src/input.css -o ./dist/styles.css --watch`

**Key Challenges & Solutions**

* Responsive Design: Mobile-first with Flexbox & Grid
* Animations: Used transform/opacity + Intersection Observer
* Dark Mode: CSS variables + JS toggle + local storage

**Links**

* GitHub Repo: [Insert Link]
* Live Demo: [Insert Link]
* Assets: [Insert Google Drive Link]

---

## Documentation – SDLC Report

**Problem**
Need a professional portfolio to attract clients and employers.

**Requirements Summary**

| Requirement       | Status | Implementation                    |
| ----------------- | ------ | --------------------------------- |
| Responsive Design | ✅      | Mobile-first, Tailwind CSS        |
| Dark/Light Theme  | ✅      | CSS variables + JS toggle         |
| Project Showcase  | ✅      | Interactive cards with overlays   |
| Skills Display    | ✅      | Animated progress bars            |
| Contact Form      | ✅      | Validation + submission handling  |
| PWA Features      | ✅      | Service Worker + Manifest         |
| Performance       | ✅      | Optimized images + lazy loading   |
| Accessibility     | ✅      | ARIA labels + keyboard navigation |

**Design Outcomes**

* One-page layout improved engagement and SEO
* Purple gradient ensured strong branding and readability

**Technical Highlights**

* Lazy-loaded images and compressed CSS
* Smooth animations and fast page load (<3s)
* Fully responsive, accessible, and SEO optimized

**Challenges Solved**

* Animation lag → optimized with requestAnimationFrame
* Complex form validation → modularized functions
* Browser inconsistencies → added fallbacks

**Final Evaluation**

* ✅ Responsive and fast
* ✅ Accessible and installable (PWA)
* ✅ Clean design with strong visuals

**Learning Outcomes**

* Improved in CSS animations, JS optimization, and PWA setup
* Strengthened design thinking, debugging, and documentation skills

**Future Enhancements**

* Backend integration for contact form
* Blog section and project filters
* Multi-language support and Web P optimization

**Reflection**
This project effectively displays technical ability and design sense. It built a strong foundation for ongoing updates and portfolio growth.

**Status:** ✅ Complete & Deployed
**Next Steps:** Continuous updates with new projects

