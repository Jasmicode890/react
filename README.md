# CelebrationCraft — Milestone Celebration & Event Packages

A responsive single-page React application developed for the **Third Component Task Submission**. **CelebrationCraft** empowers users to browse personal milestones (*Birthdays, Haldi Ceremonies, Marriages, and Baby Showers*), explore curated event packages, submit booking requests with real-time validated forms, and dynamically add custom celebration themes via React State.

---

## 🌟 Core Features & Pages

### 1. Home Page (`/` or Home Tab)
- **Hero Section:** Elegant welcome message introducing CelebrationCraft with trust metrics (5,200+ hosted celebrations, 4.95★ rating) and quick call-to-action buttons.
- **Category Preview Cards:** 4 high-impact static cards for **Birthday**, **Haldi Ceremony**, **Marriage**, and **Baby Shower**. Clicking any card navigates directly to the catalog with the category pre-filtered.
- **Curated Highlights:** Showcase grid featuring top celebration packages with quick booking access.

### 2. Event Catalog Page (`/events`)
- **Search Bar:** Simple and intuitive text input that filters celebration packages by package name, category, or description in real time.
- **Category Filters & Sorting:** Quick-filter pill buttons (*All, Birthday, Haldi Ceremony, Marriage, Baby Shower*) and sort options (*Price: Low to High, Price: High to Low, Highest Rated*).
- **Event Cards (Props & Components):** Reusable `EventCard` component receiving `event` and `onBookNow` via **Props**. Displays celebration type, base price, guest capacity, duration, features, rating, and a prominent **"Book Now"** button.

### 3. Booking Form Page (`/book`)
- **Interactive Form:** Collects user full name, email address, contact phone, event date, estimated guest count, and selected celebration type.
- **Form Validation via `useState`:**
  - Real-time and submit-time validation ensuring all required fields are filled.
  - Ensures event dates are today or in the future.
  - Ensures valid 10-digit phone number and email formatting.
  - Displays inline contextual error messages.
- **Booking Receipt & Celebration Confetti:** Successful submission triggers a confetti animation (`canvas-confetti`) and generates a detailed **Booking Confirmation Receipt Modal** with a unique reference ID (e.g. `CC-2026-8941`).
- **Recent Bookings Tracker:** Displays a list of confirmed reservations saved to live state.

### 4. Add Custom Event Page (`/create`)
- **Live State Management:** Form that allows users to create a brand-new celebration package and add it to the application's live React state list.
- **Dynamic Live Preview:** As users enter details (title, category, price, description, features, theme color, banner image), a live `EventCard` updates simultaneously on screen.
- **Instant UI Update:** Submitting the form instantly updates the live catalog without requiring a page reload.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 (Single-Page Application Architecture)
- **Tooling & Bundler:** Vite
- **Styling:** Vanilla CSS with custom properties (CSS variables), glassmorphism, responsive flex/grid layouts, and celebratory animations
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

---

## 📂 Project Structure

```
Full Stack task/
├── index.html                   # HTML entry point with Google Fonts & SEO tags
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite build configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application state, routing, and handlers
│   ├── index.css                # Global design system & Vanilla CSS styling
│   ├── data/
│   │   └── initialEvents.js     # Default celebration packages & category metadata
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky navigation bar with package counter
│   │   ├── HeroSection.jsx      # Hero section with welcome message
│   │   ├── CategoryPreviewCards.jsx # 4 static milestone category preview cards
│   │   ├── EventCard.jsx        # Reusable event card component (Props)
│   │   ├── SearchBar.jsx        # Search text input and category filters
│   │   ├── BookingForm.jsx      # Validated interactive booking form (useState)
│   │   ├── BookingModal.jsx     # Booking confirmation receipt modal
│   │   ├── CreateEventForm.jsx  # Custom theme creator with live state update
│   │   ├── Toast.jsx            # Notification toast for user actions
│   │   └── Footer.jsx           # Global responsive footer with project tags
│   └── pages/
│       ├── HomePage.jsx         # Home page layout
│       ├── CatalogPage.jsx      # Event catalog with search & cards
│       ├── BookingPage.jsx      # Booking form page layout
│       └── CreateEventPage.jsx  # Custom event creation page layout
```

---

## 🚀 How to Run the Application Locally

1. **Clone or Open Project Directory:**
   ```bash
   cd "Full Stack task"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/) in your web browser.

5. **Build for Production (Optional):**
   ```bash
   npm run build
   ```

---

## 📋 Academic Compliance Checklist

- [x] **Responsive Single-Page Application** named **CelebrationCraft**.
- [x] **Home Page (`/`):** Hero section with welcome message & 4 static category preview cards (Birthday, Haldi, Marriage, Baby Shower) linking to catalog.
- [x] **Event Catalog Page (`/events`):** Search bar filtering by name/category & Event Cards with celebration type, base price, and "Book Now" button using Props and Components.
- [x] **Booking Form Page (`/book`):** Collects name, date, guest count, celebration type, with robust `useState` validation and confirmation feedback.
- [x] **Add Custom Event Page (`/create`):** State management adding custom packages to live state list, instantly updating the UI.
- [x] **Design Aesthetics:** High-end dark jewel aesthetic, gold accents, smooth animations, and clean responsive design.
