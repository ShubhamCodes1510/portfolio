# Developer Portfolio Website Specification

## 1. Project Overview
- **Project Name**: DevPortfolio
- **Type**: Single Page Application (Angular)
- **Core Functionality**: A modern, responsive developer portfolio showcasing skills, projects, and contact information with dark/light mode support
- **Target Users**: Recruiters, potential clients, and collaborators

## 2. Tech Stack
- **Framework**: Angular 17+
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome (via CDN)
- **Animations**: CSS transitions + Angular animations

## 3. UI/UX Specification

### Color Palette

#### Light Theme
- **Background Primary**: `#f8fafc` (slate-50)
- **Background Secondary**: `#ffffff`
- **Text Primary**: `#0f172a` (slate-900)
- **Text Secondary**: `#64748b` (slate-500)
- **Accent Primary**: `#6366f1` (indigo-500)
- **Accent Secondary**: `#8b5cf6` (violet-500)
- **Accent Gradient**: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`
- **Border**: `#e2e8f0` (slate-200)
- **Card Background**: `#ffffff`
- **Success**: `#10b981` (emerald-500)

#### Dark Theme
- **Background Primary**: `#0f172a` (slate-900)
- **Background Secondary**: `#1e293b` (slate-800)
- **Text Primary**: `#f8fafc` (slate-50)
- **Text Secondary**: `#94a3b8` (slate-400)
- **Accent Primary**: `#818cf8` (indigo-400)
- **Accent Secondary**: `#a78bfa` (violet-400)
- **Border**: `#334155` (slate-700)
- **Card Background**: `#1e293b`

### Typography
- **Font Family**: 
  - Headings: `'Clash Display', sans-serif` (from CDN)
  - Body: `'Satoshi', sans-serif` (from CDN)
- **Font Sizes**:
  - Hero Name: 4rem (64px) desktop, 2.5rem mobile
  - Section Title: 2.5rem (40px) desktop, 1.75rem mobile
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout
- **Max Width**: 1280px
- **Sections Padding**: 80px vertical (desktop), 48px (mobile)
- **Card Border Radius**: 16px
- **Button Border Radius**: 8px

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 4. Component Specification

### 4.1 Navigation Bar
- **Position**: Fixed top, z-index 50
- **Background**: Semi-transparent with backdrop blur
- **Height**: 72px
- **Content**: Logo (left), Nav links (center), Theme toggle (right)
- **Links**: Home, About, Skills, Projects, Resume, Contact
- **Mobile**: Hamburger menu with slide-out drawer

### 4.2 Hero Section
- **Height**: 100vh (minus navbar)
- **Layout**: Two columns - Text left, Image/Graphic right
- **Content**:
  - Greeting: "Hello, I'm" with wave emoji
  - Name: Large gradient text
  - Title: Typing animation cycling through roles
  - Description: 2-3 sentences
  - Buttons: "Hire Me" (primary), "View Projects" (outline)
- **Background**: Subtle animated gradient mesh or particles
- **Typing Animation**: 3 roles, 100ms typing speed, 2s pause between

### 4.3 About Section
- **Layout**: Two columns - Image left, Content right
- **Content**:
  - Section title with accent underline
  - Professional bio (3-4 paragraphs)
  - Career highlights (2-3 bullet points)
  - Tech stack badges (20+ technologies)

### 4.4 Skills Section
- **Layout**: Grid of category cards
- **Categories**: Frontend, Backend, Database, Tools
- **Each Category**:
  - Icon header
  - List of skills with animated progress bars
  - Progress: 0-100% width animation on scroll reveal
- **Skills to include**:
  - Frontend: Angular, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind
  - Backend: Java, Spring Boot, Node.js, Express, REST APIs
  - Database: MySQL, PostgreSQL, MongoDB, Firebase
  - Tools: Git, Docker, AWS, VS Code, IntelliJ, Figma

### 4.5 Projects Section
- **Layout**: Filterable grid (3 columns desktop, 2 tablet, 1 mobile)
- **Filter**: All, Java, Web Development, Full Stack
- **Project Card**:
  - Project image/thumbnail
  - Project title
  - Short description (2 lines max)
  - Tech stack tags (max 4)
  - Buttons: Live Demo, GitHub
  - Hover: Scale up slightly, shadow increase

### 4.6 GitHub Section
- **Content**:
  - GitHub profile link with avatar
  - Stats: Repositories, Followers, Contributions
  - Contribution graph (simple calendar heatmap style)
  - Pinned repositories list (3-4 projects)

### 4.7 Resume Section
- **Layout**: Split - Preview left, Download right
- **Content**:
  - Professional summary
  - Work experience timeline
  - Education
  - Download button (PDF)

### 4.8 Contact Section
- **Layout**: Two columns - Form left, Info right
- **Form Fields**: Name, Email, Message (all required)
- **Validation**: Email format, min length for message
- **Submit**: Button with loading state
- **Info**:
  - Email address
  - Location
  - Social links (GitHub, LinkedIn, Twitter)
  - Response time indicator

### 4.9 Footer
- **Content**: Copyright, Social links, Back to top button
- **Style**: Minimal, centered

## 5. Animations & Interactions

### Scroll Reveal
- **Effect**: Elements fade in and slide up on scroll
- **Threshold**: 100px from viewport
- **Duration**: 600ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`

### Hover Effects
- **Buttons**: Scale 1.02, shadow increase
- **Cards**: Scale 1.02, shadow increase
- **Links**: Color transition, underline animation
- **Project images**: Slight zoom

### Theme Toggle
- **Animation**: Smooth color transition (300ms)
- **Icon**: Sun/Moon with rotation

### Typing Animation
- **Cursor**: Blinking pipe character
- **Speed**: 100ms per character
- **Pause**: 2000ms between words
- **Loop**: Infinite

### Progress Bars
- **Animation**: Width from 0 to value on scroll
- **Duration**: 1000ms
- **Easing**: ease-out

## 6. Additional Features

### Back-to-Top Button
- **Position**: Fixed bottom-right
- **Trigger**: Appears after 500px scroll
- **Style**: Circular, accent color, arrow icon
- **Animation**: Smooth scroll to top

### Visitor Counter
- **Location**: Footer
- **Display**: "X visitors" (simulated/local storage)

### SEO
- **Meta tags**: Title, Description, Keywords, Open Graph
- **Semantic HTML**: Proper heading hierarchy, alt tags

### Performance
- **Lazy loading**: Images
- **Minified assets**: Production build
- **Cache**: Service worker for offline

## 7. Acceptance Criteria

### Visual Checkpoints
- [ ] Navigation is sticky and functional on all devices
- [ ] Hero section fills viewport with typing animation working
- [ ] Dark/Light mode toggle works and persists
- [ ] All sections have scroll reveal animations
- [ ] Skills show animated progress bars
- [ ] Projects filter works correctly
- [ ] Contact form validates inputs
- [ ] Mobile menu opens/closes properly
- [ ] Back-to-top button appears and works

### Functional Checkpoints
- [ ] All nav links scroll to correct sections
- [ ] Theme toggle persists across page loads
- [ ] Project filters show correct categories
- [ ] Form validation shows error messages
- [ ] Social links open in new tabs
- [ ] Resume download works

### Performance
- [ ] Page loads under 3 seconds
- [ ] No console errors
- [ ] Responsive at all breakpoints