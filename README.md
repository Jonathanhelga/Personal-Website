# Jonathan Adiyasa Helga - Developer Portfolio
The source code for my personal portfolio website, designed to showcase my interests in Embedded Systems and projects Full Stack Development.

## Live Site
[jonathanhelgalie.dev](https://jonathanhelgalie.dev)

## Tech Stack
* **State Management:** Zustand
* **Framework:** React (Vite)
* **Styling:** CSS Modules
* **Animation:** GSAP / Three.js (React Three Fiber)
* **Hosting:** Vercel

## Design
* **Minimalist & Performance-First:** Designed to load fast and present information clearly without clutter.
* **Responsive:** Automatic scroll to the next section with a single scroll down.
* **Accessibility:** Built with semantic HTML.

## Project Structure
* `/src/components/sections` - Make each section as an independent components (Introduction, About Me, Projects).
* `/src/components/Experience.jsx` - Three.js environment integration.
* `/src/components/utils` - Helper functions and resource loading managers.
*  `/src/App.jsx` - Main entry point composing the 2D UI and 3D Canvas.
* `/public` - static assets

## 📦 Run Locally

```bash
# Clone the repository
git clone [https://github.com/Jonathanhelga/Personal-Website.git](https://github.com/Jonathanhelga/Personal-Website.git)

# Navigate to directory
cd Personal-Website

# Install dependencies
npm install

# Start the development server
npm run dev