# 🔍 MediaFinder App

> A premium, responsive web application for searching free images, videos, and GIFs from top providers (Unsplash, Pexels, and Giphy) and curating your personal collection.

🌐 **Live Demo:** [mediafinder-app.netlify.app](https://mediafinder-app.netlify.app/)

---

## ✨ Features

- **Multi-Provider Search:** Find assets from Unsplash (Images), Pexels (Videos), and Giphy (GIFs) in a single unified interface.
- **Categorized Filters:** Smoothly toggle between media types using tab filters.
- **Interactive Previews:** Auto-plays Pexels videos on mouse hover and displays animations cleanly.
- **Dynamic Collection System:**
  - Save your favorite items by clicking the **Heart** icon on cards.
  - View all saved assets in a premium, slide-out drawer dashboard.
  - Persists your saved collection automatically inside the browser using `localStorage`.
- **Ultra-Modern UX:** Built with Tailwind CSS, featuring subtle transitions, micro-animations, glassmorphic backdrop overlays, and fully responsive grid layouts.

---

## 🏗️ Architecture

MediaFinder showcases a hybrid architecture for managing front-end state:

1. **Search System (Redux-powered):** Uses Redux Toolkit to fetch search results, handle query synchronization, monitor loading states, and catch API errors.
2. **Collection System (Redux-free React):** Manages bookmarked items and drawer overlays locally in [Home.jsx](src/pages/Home.jsx) using standard React state, persisting changes dynamically to the browser's `localStorage` (mapped keys: `imgData`, `videoData`, and `gifData`).

---

## 🛠️ Tech Stack

- **Core:** React 19, JavaScript (ES6+)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vite integration)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
- **HTTP Client:** Axios

---

## 📂 Project Structure

```bash
media_App/
├── public/                # Static assets
├── src/
│   ├── api/               # API clients (Unsplash, Pexels, Giphy)
│   │   └── mediaAPI.js
│   ├── components/        # Reusable UI components
│   │   ├── CollectionDrawer.jsx  # Side-panel drawer for saved media
│   │   ├── MediaCard.jsx         # Card template for Images/Videos/GIFs
│   │   ├── MediaGrid.jsx         # Grid wrapper with loading/error states
│   │   ├── SearchBar.jsx         # Form wrapper for searching
│   │   └── TabSelector.jsx       # Category navigation tabs
│   ├── pages/
│   │   └── Home.jsx       # Main layout and Collection state container
│   ├── redux/             # Redux Store & search.slice configuration
│   │   ├── slices/
│   │   │   ├── search.slice.js
│   │   │   └── collection.slice.js (Unused, decoupled)
│   │   └── store.js
│   ├── App.jsx            # Application entry route wrapper
│   ├── index.css          # Tailwind configurations
│   └── main.jsx           # ReactDOM renderer
├── .env                   # Local configuration keys (ignored in production)
├── eslint.config.js       # ESLint configurations
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Configure Environment Variables
Create a `.env` file in the root of the `media_App` directory with the following API keys:

```env
UNSPLASH_API_KEY=your_unsplash_access_key
PEXELS_API_KEY=your_pexels_api_key
GIPHY_API_KEY=your_giphy_api_key
```

> [!NOTE]
> You can acquire keys by registering developer accounts at:
> - [Unsplash Developers](https://unsplash.com/developers)
> - [Pexels API Documentation](https://www.pexels.com/api/)
> - [Giphy Developers](https://developers.giphy.com/)

### 3. Installation
Install project dependencies using npm:

```bash
npm install
```

### 4. Running the App locally
Launch the Vite local development server:

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 5. Production Build
To create a production build, run:

```bash
npm run build
```
Vite will compile the code into optimized static files inside the `dist` directory, ready to be served by host platforms like Netlify.
