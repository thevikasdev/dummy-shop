# Frontend Engineering Assessment

A product listing and detail application built with React, TypeScript, and Tailwind CSS, using the [DummyJSON Products API](https://dummyjson.com/docs/products).

---

## Live Demo

🔗 [Demo Link](#) *(update after deploying)*

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
├── types/             # TypeScript interfaces (Product, Filters, Category, Review)
├── api/               # API layer — all DummyJSON fetch calls
├── hooks/             # Custom React hooks (useProducts, useCategories)
├── components/
│   ├── ui/            # Generic reusable components (StarRating, Pagination, Spinner, ErrorMessage)
│   ├── product/       # Product-specific components (ProductCard, ProductGrid, ProductSkeleton)
│   ├── filters/       # Filter sidebar
│   └── layout/        # App-level layout (Header)
└── pages/             # Route-level page components (ListingPage, DetailPage)
```

---

## Assumptions Made

- **Client-side filtering for price and brand.** The DummyJSON API does not support server-side filtering by price or brand, so all products (up to 200) are fetched upfront and filtered in the browser. This is acceptable given the dataset size.
- **Category filter is mutually exclusive.** Only one category can be active at a time, matching the API's `/products/category/{slug}` endpoint.
- **Brand filter is multi-select.** Users can combine multiple brands — more useful than single-select in a real shopping context.
- **Page size is fixed at 12 products.** Fits a clean 4-column grid and keeps pagination manageable.
- **Filters survive back-navigation via URL.** Since filters are encoded in URL search params, navigating back from a detail page automatically restores the exact filter state with no extra state management.

---

## Architectural Decisions

### URL-based filter state
Filters are stored in URL search params (`?category=smartphones&minPrice=100&brand=Apple`) rather than React context or local state. This makes filters shareable, bookmarkable, and automatically preserved across browser navigation for free.

### Client-side filtering after one API call
The API is called once per category change to fetch all matching products. Price and brand filters are then applied in-memory. This avoids multiple API round-trips and keeps filtering instant after the initial load.

### Layered separation of concerns
- **`api/`** — pure async fetch functions, no React dependencies
- **`hooks/`** — all data-fetching and filtering logic, no JSX
- **`components/`** — purely presentational, organised by domain (`ui`, `product`, `filters`, `layout`)
- **`pages/`** — route-level composition, connects hooks to components

### TypeScript strict mode
All types are defined once in `src/types/product.ts` and used throughout. Strict mode is enabled with zero type errors.

---

## Improvements Given More Time

1. **Search bar** — full-text search via `/products/search?q=`, combined with active filters.
2. **Sort options** — sort by price (low–high / high–low) and by rating.
3. **React Query** — replace manual `useEffect` fetching with proper caching, background refetching, and stale-while-revalidate behaviour.
4. **Persisted filters** — optionally save last-used filters to `localStorage` so they survive a page refresh.
5. **Mobile filter drawer** — collapse the sidebar into a bottom sheet / modal on small screens.
6. **Virtualised list** — use `react-window` or `react-virtual` for large product sets to avoid rendering off-screen cards.
7. **Accessibility** — `aria-live` regions for filter result counts, keyboard navigation for the image gallery, focus management on route change.
8. **Unit & integration tests** — filter logic in `useProducts`, and render tests for `FilterSidebar` and `ProductCard` with Vitest + React Testing Library.
9. **Image placeholders** — blur-up skeleton while product images load (similar to Next.js `<Image>`).
10. **Error boundary** — React error boundary wrapping pages for graceful runtime error handling.
