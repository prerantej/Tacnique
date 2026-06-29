# Tacnique User Management Dashboard

A production-quality React + Vite dashboard for complete user directory administration. Built with custom components, Tailwind CSS, Framer Motion, and Axios, this application features full CRUD actions synced with `localStorage` to simulate backend persistence alongside standard mock API integrations.

---

## 1. Project Scaffolding Structure

This project follows a clean architecture separating HTTP services, state managers, validation rules, layout coordinators, and UI components.

```
src/
├── api/
│   └── userService.js        # Isolates Axios configurations & REST actions
├── components/
│   ├── Button.jsx            # Reusable button with custom styles & sizes
│   ├── ConfirmDelete.jsx     # Safe warning modal overlay dialog
│   ├── EmptyState.jsx        # Illustrated placeholder for missing records
│   ├── FilterDrawer.jsx      # Animated slide-over side panel
│   ├── Header.jsx            # Sticky branding navigation topbar
│   ├── Input.jsx             # Reusable input with validation visuals
│   ├── LoadingSkeleton.jsx   # Tabular grid pulsing skeleton loaders
│   ├── Pagination.jsx        # Navigation controls with boundary logic
│   ├── SearchBar.jsx         # Debounced text query input
│   ├── UserFormModal.jsx     # Unified modal dialog for Add & Edit
│   ├── UserRow.jsx           # Double layouts (desktop row vs mobile card)
│   └── UserTable.jsx         # Clickable sortable table header grid
├── hooks/
│   └── useUsers.js           # Stateful hook coordinating CRUD & localStorage
├── utils/
│   ├── constants.js          # Shared app-wide settings & default sizes
│   ├── filtering.js          # Text matching and department filters
│   ├── helpers.js            # Initial string handlers & CSV downloader
│   ├── sorting.js            # Multi-type column natural order sorter
│   └── validators.js         # Validation engine (emails, empty values)
├── App.jsx                   # Theme toggle coordinator & layout main shell
├── index.css                 # Custom scrollbars, glass styles, & Tailwind base
└── main.jsx                  # React DOM target initialization
```

---

## 2. Technical Stack

- **Framework:** React 19 (Vite 8)
- **Styling:** Tailwind CSS v4 (Zero Config, dynamic `@theme` variables, CSS variable animations)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast (Sleek Glassmorphic Alerts)
- **Transitions:** Framer Motion (Subtle spring overlays, side-panel slides)
- **HTTP client:** Axios
- **Testing environment:** Vitest + JSDOM + `@testing-library/react`

---

## 3. Engineering Decisions & Architecture

### A. LocalStorage Persistence Coordination
Because JSONPlaceholder is a fake read-only REST API, `POST`, `PUT`, and `DELETE` requests do not persist edits. To fulfill the production assignment constraints:
1. The custom `useUsers` hook checks `localStorage` for cached user directory changes on load.
2. If cache exists, it loads directly from `localStorage` to preserve mock sessions across refreshes.
3. If no cache is present, it fetches from the REST API, applies the name splitting mapping, saves to `localStorage`, and updates state.
4. Any additions, updates, or deletions dispatch HTTP requests (to verify API layer compliance) and update the `localStorage` cache simultaneously upon status success.

### B. Input Debouncing vs Instant Rendering
To prevent heavy filtering re-renders on every single keystroke, the `SearchBar` manages input changes in local state instantly (so the text box feels responsive), but uses a **300ms debounce timeout** before notifying the parent component. This prevents UI stuttering while typing.

### C. Multi-Viewport Responsive Double-Layouts
Standard CSS wrappers (`overflow-x: auto`) for tables often fail to provide a good mobile user experience. In this dashboard:
- **Desktop/Tablet view:** Displays a clean structured grid layout with sticky headers and group hover action controls.
- **Mobile view:** Collapses the row into independent cards detailing names, initials, department badges, and prominent touch action targets (minimum $44 \times 44$ pixels).

### D. Deterministic Pastel Avatars
Avatars are generated dynamically from initials. Instead of allocating random background colors that shift on every render, a hash algorithm generates a **deterministic pastel background** based on the user's name. This ensures John Doe always retains the same avatar color throughout his lifecycle.

---

## 4. Data Mapping & Mappings Assumptions

JSONPlaceholder does not contain `firstName`, `lastName`, or `department` fields. We map the schema as follows:
- **First Name:** Derived by splitting the `name` string on the first whitespace boundary.
- **Last Name:** Derived from the remaining parts of the `name` string. If no space is present, the last name defaults to an empty string.
- **Department:** Assigned during the initial fetch mapping phase using a round-robin allocation from our `DEPARTMENTS` list (Engineering, Design, Product, Marketing, Sales, QA, HR). This creates a realistic distribution.

---

## 5. Client-Side Form Validation Rules

Form submissions are intercepted and validated inline against:
1. **Empty Fields:** First Name, Last Name, and Email must not be empty or whitespace-only.
2. **Email Formatting:** Checks standard format constraints using a robust email regular expression.
3. **Email Uniqueness:** Prevents submitting a form if the email matches another user in the current active dataset. During edits, the validation query ignores the profile currently being updated.

Inline validation errors update in real time as the administrator types, providing immediate visual feedback.

---

## 6. Challenges Faced & Mitigations

- **JSONPlaceholder ID Collisions:** Adding a new user via simulated POST requests always returns ID `11`. If we add multiple users, they would duplicate IDs.
  - *Mitigation:* The `useUsers` hook scans local list IDs and assigns `Math.max(...ids) + 1` dynamically, ensuring no duplicate keys occur.
- **Vite 8 & Tailwind v4 CSS imports order:** The CSS compiler threw warnings regarding `@import` ordering.
  - *Mitigation:* Moved the Google Font `@import` directives to the absolute top of `index.css`, resolving the bundling issue.

---

## 7. Future Architectural Improvements

1. **Server-Side Filtering and Pagination:** Fetching 100,000 users would break browser performance. Slicing and filtering should be handled on the backend via query string parameters.
2. **Strict Accessibility Focus Trap:** Modals should trap tab focus within their container to prevent focus escaping to behind components.
3. **OAuth2 / Authentication Guard:** Add admin sign-in protection using JWT tokens or standard providers.

---

## 8. Getting Started & Installation

### Prerequisite
Ensure [Node.js](https://nodejs.org/) (version 18+) is installed.

### Setup Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/prerantej/Tacnique.git
   cd Tacnique
   ```
2. **Install all packages:**
   ```bash
   npm install
   ```
3. **Launch the development server:**
   ```bash
   npm run dev
   ```
4. **Build production static assets:**
   ```bash
   npm run build
   ```
5. **Run the automated unit tests:**
   ```bash
   npm run test
   ```
