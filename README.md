# 🎬 Pixel – A Cinematic Streaming Platform

**Your world of stories, all in one place.**

Pixel is a modern, Netflix-inspired OTT streaming platform designed to bring movies, television series, anime, K-Dramas, and C-Dramas together in one cinematic entertainment experience.

Featuring a sleek dark interface, personalized viewer profiles, content discovery, genre-based browsing, and interactive watchlist functionality, Pixel aims to recreate the experience of exploring a premium streaming service.

---

## 🌟 About the Project

Pixel is a frontend-focused streaming platform built to demonstrate modern web development concepts through an interactive and visually immersive application.

The platform features a collection of fictional movies and shows, original Pixel productions, and dedicated browsing experiences for different entertainment categories.

Its interface is designed around a cinematic dark theme, with large featured banners, attractive title cards, smooth transitions, and intuitive navigation.

**Project Name:** Pixel  
**Project Type:** Netflix-Inspired OTT Streaming Platform  
**Tagline:** Your world of stories, all in one place.

## ✨ Key Features

### 🏠 1. Cinematic Homepage
- Modern streaming-platform interface with a dark theme.
- Large featured-content hero banner.
- Automatically rotating featured titles.
- Dedicated content sections and horizontal title carousels.
- Continue Watching section.
- Personalized recommendations.
- Trending and popular content sections.

### 🎞️ 2. Multiple Entertainment Categories

Explore different types of entertainment through dedicated browsing pages.

- **Pixel Originals:** Fictional exclusive movies and series created for the platform.
- **Movies:** Browse feature films across different genres.
- **Series:** Discover binge-worthy television shows.
- **Anime:** Explore fantasy, action, adventure, and slice-of-life anime.
- **K-Drama:** Discover Korean romance, thriller, and drama series.
- **C-Drama:** Explore Chinese fantasy, historical, romance, and drama series.

### 🔍 3. Search and Content Discovery
- Search for titles by movie or series name.
- Search using actors, directors, genres, and keywords.
- Browse titles by genre.
- Explore content through dedicated category pages.
- Filter titles by year, language, and rating.
- Sort results by different criteria.
- Reset filters to return to the complete catalogue.

### 🎬 4. Movie and Series Details
Every title has a dedicated information page featuring:

- Movie or series title.
- Background artwork and poster.
- Release year.
- Genre.
- Content maturity rating.
- User rating and match percentage.
- Runtime or season information.
- Synopsis and description.
- Cast members.
- Director and studio information.
- Similar and recommended titles.

For television series, the interface also supports season selection and episode information.

### ❤️ 5. My List
Create a personalized collection of movies and shows.

- Add titles to My List.
- Remove previously saved titles.
- View saved movies and series.
- Organize saved content by category.
- Receive visual feedback when adding or removing titles.

### 👤 6. Multiple Viewer Profiles

Pixel includes multiple viewer profiles to simulate a shared streaming account.

- Switch between different viewer profiles.
- Maintain separate preferences for each profile.
- Create a personalized viewing experience.
- Includes a dedicated Kids profile.

The Kids profile restricts access to titles that do not meet the application's configured age-rating criteria.

### ▶️ 7. Continue Watching
- Track viewing progress for supported sample playback.
- Display previously watched titles.
- Show playback progress indicators.
- Resume titles using their saved progress information.
- Remove titles from the Continue Watching section.

### 👍 8. Like and Dislike System
- Like movies and television shows.
- Mark titles as not preferred.
- Store individual preferences.
- Use viewer feedback as part of the recommendation experience.

### 🔔 9. Notifications
- Display platform notifications.
- Highlight unread notifications.
- Mark all notifications as read.
- Navigate to relevant titles from notifications.

### 📱 10. Responsive User Interface
- Modern dark cinematic design.
- Responsive layouts for different screen sizes.
- Interactive movie cards.
- Smooth hover effects and transitions.
- Mobile-friendly navigation menu.
- Attractive typography and visual elements.

---

## 🛠️ Tech Stack

Pixel is developed using modern frontend technologies and tools.

| Technology | Purpose |
|---|---|
| React 19 | Building reusable UI components |
| TypeScript | Type safety and maintainable code |
| TanStack Router | Application routing and navigation |
| TanStack Start | Application framework |
| Vite | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive layouts |
| Radix UI | Accessible UI components |
| Lucide React | Icons and visual elements |
| TanStack Query | Query and data management |
| Sonner | Toast notifications |
| Vitest | Testing framework |
| ESLint | Code quality and linting |
| Prettier | Code formatting |

## 🎨 Design and UI/UX

Pixel follows a premium OTT-inspired visual identity.

**Design characteristics:**
- Dark background with subtle gradients.
- Cinematic movie banners and artwork.
- Bold and modern typography.
- Attractive movie and series cards.
- Smooth transitions and hover animations.
- Clean navigation and organized content sections.
- Consistent spacing and responsive layouts.

**Typography:**
- Inter
- Poppins
- JetBrains Mono

The interface is designed to provide an immersive entertainment experience across desktop, tablet, and mobile devices.

---

## 📂 Project Structure

The project follows a component-based architecture.

```text
Pixel/
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   │
│   ├── assets/
│   │   └── titles/             # Movie and series artwork
│   │
│   ├── components/
│   │   ├── pixel/              # Custom Pixel components
│   │   │   ├── BrowseView.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ListLikeButtons.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProfileAvatar.tsx
│   │   │   ├── TitleCard.tsx
│   │   │   ├── TitleMeta.tsx
│   │   │   └── TitleRow.tsx
│   │   │
│   │   └── ui/                 # Reusable UI components
│   │
│   ├── data/
│   │   └── catalog.ts          # Movie and series catalogue
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx
│   │
│   ├── lib/
│   │   ├── viewer-store.tsx    # Viewer profiles and preferences
│   │   ├── utils.ts
│   │   └── error-capture.ts
│   │
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx           # Homepage
│   │   ├── originals.tsx
│   │   ├── movies.tsx
│   │   ├── series.tsx
│   │   ├── anime.tsx
│   │   ├── kdrama.tsx
│   │   ├── cdrama.tsx
│   │   ├── genres.tsx
│   │   ├── search.tsx
│   │   ├── my-list.tsx
│   │   └── title.$id.tsx       # Title details
│   │
│   ├── routeTree.gen.ts
│   ├── router.tsx
│   └── styles.css
│
├── .gitignore
├── package.json
├── bun.lock
├── bunfig.toml
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run Pixel locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm (included with Node.js)

Alternatively, you can use Bun.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Pixel.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Navigate to the Project Directory

```bash
cd Pixel
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 4. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Bun:

```bash
bun run dev
```

### 5. Open the Application

Open the local development URL displayed in your terminal.

Vite will provide the address where the application is running.

---

## 📜 Available Scripts

The following scripts are defined in `package.json`.

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run build:dev` | Creates a development-mode build |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |
| `npm run format` | Formats the project using Prettier |
| `npm test` | Runs the test suite |
| `npm run test:watch` | Runs tests in watch mode |

---

## 💾 Data Storage

Pixel currently uses a locally defined content catalogue and browser-based storage.

- Movie and series information is maintained in `src/data/catalog.ts`.
- Viewer profiles and preferences are managed through `src/lib/viewer-store.tsx`.
- My List, likes/dislikes, notifications, and viewing progress are stored using browser `localStorage`.
- Each browser maintains its own saved viewer data.

**Note:** The current implementation does not include a production backend, cloud database, or server-based user authentication. Viewer information is stored locally in the browser.

---

## 🎥 Sample Video Content and Credits

The project includes sample video sources from Blender Foundation films for demonstration playback.

These include:

- Big Buck Bunny
- Sintel
- Elephants Dream
- Tears of Steel

The sample videos are openly licensed under their respective Creative Commons licences. Refer to the original Blender Foundation releases and licence terms for attribution and usage details.

The movie and series titles displayed in the Pixel catalogue are fictional and are intended for demonstration purposes.

The application is not a licensed commercial movie streaming service.

---

## 🔮 Future Enhancements

Potential improvements for future versions include:

- Backend integration and database storage.
- Secure user authentication.
- User registration and account management.
- Integration with the TMDB API for real movie metadata.
- Advanced recommendation algorithms.
- More detailed user preferences.
- Additional video playback controls.
- Subtitle and language selection.
- Enhanced Kids Mode and parental controls.
- Admin dashboard for content management.
- Deployment as a fully hosted web application.

---

## ⚠️ Disclaimer

Pixel is an independent educational and development project inspired by popular OTT streaming platforms.

- Pixel is not affiliated with, sponsored by, or associated with Netflix.
- Netflix branding, logos, and proprietary assets are not used as the application's identity.
- All movie and series titles and their associated fictional information are created for demonstration purposes.
- Sample video content is sourced from openly licensed Blender Foundation films.
- No copyrighted commercial movies are hosted or distributed by this project.

---

## 🎯 Learning Objectives

This project demonstrates practical experience with:

- Developing modern React applications.
- Using TypeScript for structured application development.
- Implementing client-side routing.
- Creating reusable and modular components.
- Managing application state with React Context.
- Persisting user preferences using localStorage.
- Building search and filtering functionality.
- Designing responsive layouts with Tailwind CSS.
- Creating interactive interfaces and reusable UI components.
- Working with media assets and sample video sources.

---

## 👩‍💻 Author

**Oishee Biswas**

GitHub: [@oishee17](https://github.com/oishee17)

---

⭐ If you find this project interesting, consider giving the repository a star!

**Made with ❤️ and a passion for building cinematic web experiences.**
