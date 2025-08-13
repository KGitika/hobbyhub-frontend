# HobbyHub Frontend

A React + Vite frontend for **HobbyHub** — discover new hobbies, join local groups, and plan events with fellow enthusiasts.

This app talks to the HobbyHub Spring Boot API.

## Live

- **Frontend (GitHub Pages):** https://kgitika.github.io/hobbyhub-frontend/
- **Backend (Render):** [https://hobbyhub-backend-whhm.onrender.com](https://hobbyhub-backend-whhm.onrender.com/)

> Routing is mounted at /hobbyhub-frontend on GitHub Pages. See Routing below.
> 

---

## Features

- User **signup** & **login** (JWT-based API)
- **Onboarding** with interest selection
- **Dashboard**: hobbies, groups, events *(Connections UI hidden for now)*
- Browse **hobbies** & recommended **groups**
- **Join groups**, view group details, **RSVP** to events

> 🔕 Connections feature is temporarily hidden from Navbar and Dashboard (kept in code for a future release).
> 

---

## Tech & Dependencies

- React + Vite
- React Router DOM
- Axios
- ESLint *(optional rule to catch case-sensitive import issues)*

---

## Environment Variables

Create these at the repo root.

**Development** (`.env.development`)

```
VITE_API_BASE_URL=http://localhost:8080

```

**Production** (`.env.production`)

```
VITE_API_BASE_URL=//hobbyhub-backend-whhm.onrender.com

```

## Project Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server ([http://localhost:5173](http://localhost:5173/)) |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the built app locally |
| `npm run lint` | Run ESLint (if configured) |
| `npm test` | Placeholder |

## Local Development

```

# install deps
npm install

# run dev server
npm run dev
# open http://localhost:5173

```

The app will call the API at `VITE_API_BASE_URL` from `.env.development`.

## Backend & CORS (Render)

The backend enables CORS for:

- `http://localhost:5173` (dev)
- `http://127.0.0.1:5173` (dev alt)
- `https://kgitika.github.io` (Pages)

Public endpoints: `/auth/login`, `/auth/signup`

Other routes require a JWT via `Authorization: Bearer <token>`.

## Folder Structure (high level)

> Case-sensitive imports matter because CI runs on Linux. We standardized names (e.g., Login.jsx, Signup.jsx, Navbar.jsx) and prefer extensionless imports like import Login from './pages/Login'.
> 

```

src/
  components/
    Navbar.jsx
    Navbar.css
    ProtectedRoute.jsx
    GroupList.jsx
    HobbyList.jsx
    HobbyTile.jsx
    EventList.jsx
    EventItem.jsx
    RecommendationBox.jsx
    RecommendationCard.jsx
  pages/
    Login.jsx
    Signup.jsx
    Dashboard.jsx
    Hobbies.jsx
    Groups.jsx
    GroupPage.jsx
    Events.jsx
    HobbySelector.jsx
    # (Connections components present but hidden in UI for now)
  context/
    AuthContext.jsx
  App.jsx
  main.jsx

```

## Contributing / TODO

- Re-enable **Connections** UI when the feature is ready *(files retained)*
- Add **E2E** & **Unit Tests**

### Additional Feature Enhancements

1. **Email Verification**
2. **Password Strength Enforcement** — Require a minimum length, inclusion of special characters, numbers, and mixed case letters.
3. **Event Location Integration** — Currently a plain string; integrate with Google Maps to allow users to select a location or choose from real-time search suggestions.
4. **Event Deletion Functionality**
5. **Connections Feature Introduction**
6. **AI Integration** — Provide personalized recommendations.
7. **Recent Activity Feed**
8. **Profile Page** — Include profile settings, notification preferences, password change functionality, display picture upload, etc.