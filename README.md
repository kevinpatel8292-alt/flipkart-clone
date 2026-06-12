# SwiftShop 🛒

A responsive e-commerce web application inspired by Flipkart, built with **React** and **Vite**. SwiftShop delivers a modern, feature-rich online shopping experience with a clean UI and smooth interactions.

## 🚀 Live Demo

> Deployed via GitHub Pages / Vercel *(update link here)*

## ✨ Features

- 🔍 **Product Search** — Real-time search across product titles, categories, and descriptions
- 🗂️ **Category Filtering** — Browse products by category with a sticky sub-header navigation
- 💰 **Price Range Filter** — Slider-based price filter with live currency formatting (INR)
- ⭐ **Rating Filter** — Filter products by minimum customer rating
- ✅ **sAssured Badge** — Filter by SwiftShop-assured products
- 🛒 **Cart Drawer** — Slide-in cart with add, remove, and quantity management
- 🖼️ **Product Modal** — Detailed product view with image, specs, offers, and reviews
- 🎠 **Banner Carousel** — Auto-playing promotional banner carousel on the home screen
- 🌙 **Dark / Light Mode** — Theme toggle with persistent UI adaptation
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Library |
| Vite | Build tool & Dev Server |
| Vanilla CSS | Styling |
| Lucide React | Icons |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation with search, cart icon & theme toggle
│   ├── Categories.jsx      # Horizontal category filter sub-header
│   ├── BannerCarousel.jsx  # Auto-playing hero banner
│   ├── ProductCard.jsx     # Individual product grid card
│   ├── ProductModal.jsx    # Full product detail modal
│   ├── CartDrawer.jsx      # Slide-in shopping cart
│   └── Footer.jsx          # Site footer with links & info
├── data/
│   └── productsData.js     # Static product catalog data
├── App.jsx                 # Root component with all state & logic
├── App.css                 # Component-level styles
└── index.css               # Global styles & CSS variables
```

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/kevinpatel8292-alt/flipkart-clone.git
cd flipkart-clone

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📸 Screenshots

> *(Add screenshots here)*

## 👤 Author

**Kevin Patel**
- GitHub: [@kevinpatel8292-alt](https://github.com/kevinpatel8292-alt)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
