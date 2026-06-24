# Frontend Engineering Assessment — ShopZone

A product listing and detail application built with **React**, **TypeScript**, and **Tailwind CSS**, using the [DummyJSON Products API](https://dummyjson.com/docs/products).

---

## Live Demo

🔗 [Demo Link](https://iridescent-sfogliatella-8976e8.netlify.app/)

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- npm v9+

### Run locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Frontend-Assesment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── types/
│   └── product.ts         # TypeScript interfaces — Product, Category, Filters, Review
├── api/
│   └── products.ts        # All DummyJSON API calls (typed, no React dependencies)
├── hooks/
│   ├── useProducts.ts     # Fetch, filter, paginate, and search logic
│   ├── useCategories.ts   # Category list fetching
│   └── useDebounce.ts     # Generic debounce hook used for search input
├── components/
│   ├── ui/
│   │   ├── StarRating.tsx     # Star icon rating display
│   │   ├── Pagination.tsx     # Previous / page numbers / Next controls
│   │   ├── Spinner.tsx        # Loading spinner
│   │   └── ErrorMessage.tsx   # Error state with optional retry button
│   ├── product/
│   │   ├── ProductCard.tsx    # Individual product card (image, title, price, rating)
│   │   ├── ProductGrid.tsx    # Responsive product grid or empty state
│   │   └── ProductSkeleton.tsx # Animated skeleton loader
│   ├── filters/
│   │   └── FilterSidebar.tsx  # Category checkboxes, price range + Apply, brand checkboxes
│   └── layout/
│       └── Header.tsx         # Sticky top nav — hamburger, brand, search, cart/wishlist/profile icons
└── pages/
    ├── ListingPage.tsx    # Product listing with filters, search, grid, pagination
    └── DetailPage.tsx     # Product detail — image gallery, description, reviews, back button
```

---

## Assumptions Made

- **Client-side filtering for price and brand.** The DummyJSON API does not support server-side filtering by price or brand, so all products (up to 200) are fetched upfront and filtered in the browser. This is acceptable given the dataset size.
- **Category filter is mutually exclusive.** Only one category can be active at a time, matching the API's `/products/category/{slug}` endpoint.
- **Brand filter is multi-select.** Users can combine multiple brands — more useful than single-select in a real shopping context.
- **Page size is fixed at 12 products.** Fits a clean 4-column grid and keeps pagination manageable.
- **Filters survive back-navigation via URL.** Filters are encoded in URL search params, so navigating back from a detail page automatically restores the exact filter state with no extra state management.
- **Search is client-side with debouncing.** The top bar search filters by product title and brand name with a 400ms debounce to avoid re-filtering on every keystroke.

---

## Architectural Decisions

### URL-based filter state
Filters are stored in URL search params (`?category=smartphones&minPrice=100&brand=Apple`) rather than React context or local state. This makes filters shareable, bookmarkable, and automatically preserved across browser navigation.

### Client-side filtering after one API call
The API is called once per category change to fetch all matching products. Price, brand, and search filters are then applied in-memory. This avoids multiple round-trips and keeps filtering instant after the initial load.

### Debounced search
The global search input uses a `useDebounce` hook (400ms) so the filter logic only re-runs after the user pauses typing, not on every character.

### Collapsible sidebar
The filter sidebar is toggled via the hamburger button in the header. The open/closed state lives in `ListingPage` and is passed down — no global state needed.

### Inline styles for layout-critical elements
The header, sidebar, and pagination use inline styles for spacing and sizing to guarantee pixel-accurate rendering regardless of Tailwind's purge behaviour in different build modes.

### Layered separation of concerns
- **`api/`** — pure async fetch functions, no React dependencies
- **`hooks/`** — all data-fetching, filtering, and utility logic, no JSX
- **`components/`** — purely presentational, organised by domain (`ui`, `product`, `filters`, `layout`)
- **`pages/`** — route-level composition, connects hooks to components

### TypeScript strict mode
All types are defined once in `src/types/product.ts` and used throughout. Strict mode is enabled with zero type errors.

---

## Improvements Given More Time

1. **Sort options** — sort by price (low–high / high–low) and by rating.
2. **React Query** — replace manual `useEffect` fetching with proper caching, background refetching, and stale-while-revalidate behaviour.
3. **Persisted filters** — save last-used filters to `localStorage` so they survive a page refresh.
4. **Mobile filter drawer** — collapse the sidebar into a bottom sheet / modal on small screens.
5. **Virtualised list** — use `react-window` or `react-virtual` for large product sets to avoid rendering off-screen cards.
6. **Accessibility** — `aria-live` regions for filter result counts, keyboard navigation for the image gallery, focus management on route change.
7. **Unit & integration tests** — filter logic in `useProducts`, debounce behaviour, and render tests for `FilterSidebar` and `ProductCard` with Vitest + React Testing Library.
8. **Image placeholders** — blur-up skeleton while product images load.
9. **Error boundary** — React error boundary wrapping pages for graceful runtime error handling.
10. **Cart & wishlist** — wire up the header cart and wishlist icons with actual functionality using context or Zustand.
