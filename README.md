💍 Product Listing Application

This is a Full-Stack Product Listing Web Application built with Go (Fiber) for the backend and React (Vite + TypeScript) for the frontend.
It displays dynamically priced jewelry products, fetched from a mock API that calculates real-time USD prices based on the gold rate.

🧩 Tech Stack
🖥️ Frontend

⚛️ React 18 + TypeScript

⚡ Vite (for fast builds)

🎨 CSS3 for layout & responsiveness

🧭 React Router v6 for page navigation

🖼️ Custom Carousel (no Swiper dependency)

📱 Fully Responsive UI (Desktop, Tablet, Mobile)

⚙️ Backend

🐹 Go (Golang)

🚀 Fiber Web Framework

🌍 Dynamic gold price fetch from TCMB API

💾 JSON-based mock database

🔄 Real-time price calculation per product

📦 Folder Structure
product-listing/
├── backend/
│   ├── cmd/
│   │   └── server/main.go          # Server entry point
│   ├── data/products.json          # Product mock data
│   ├── internal/gold.go            # Gold price fetch logic (USD/gram)
│   ├── internal/handlers.go        # /products endpoint
│   └── go.mod / go.sum
│
├── frontend/
│   ├── src/
│   │   ├── api/                    # API client & DTOs
│   │   ├── components/             # ProductCard, ColorPicker, Footer, Header
│   │   ├── layouts/RootLayout.tsx  # Shared Header & Footer wrapper
│   │   ├── pages/                  # ProductList, Detail, About, Contact
│   │   ├── styles.css              # Global styles
│   │   └── main.tsx                # Router & app entry
│   └── vite.config.ts
│
└── README.md

🚀 Features
🧠 Backend

Dynamic Price Calculation:

Price = (popularityScore + 1) * weight * goldPrice


Gold price is retrieved from the Central Bank of Turkey (TCMB) and converted to USD/gram.

Cache Mechanism:
Gold price updates every 5 minutes to reduce API load.

Filtering Support (optional):

/products?minPrice=10&maxPrice=50

/products?minPopularity=0.5

🎨 Frontend

✅ Product Carousel
→ Scrolls horizontally using custom logic (drag, swipe, or arrow buttons).

✅ Color Picker
→ Switches between product colors instantly (yellow/rose/white gold).

✅ Dynamic Prices & Ratings
→ Each product shows a unique price & star rating out of 5.

✅ Detail Page Navigation
→ Clicking a product opens its dedicated detail page (/product/:slug).

✅ Responsive Design
→ Works seamlessly on desktop, tablet, and mobile.

✅ Reusable Components
→ ProductCard, ColorPicker, Header, Footer.

✅ About Page
→ Shows company background and key stats with a minimalist beige theme.

✅ Contact Page
→ Includes a validated form with “success” and “error” popups.
→ Integrated social links:
🧠 API Endpoints
Method	Endpoint	Description
GET	/products	Returns full product list
GET	/products/:id	Returns product by ID
GET	/products?filter	Optional filters by price/popularity
⚙️ Run Locally
1️⃣ Backend
cd backend
PORT=8080 go run ./cmd/server


Check:

http://localhost:8080/products

2️⃣ Frontend
cd frontend
npm install
npm run dev


App will be available at:

http://localhost:5173

💡 Environment Variables

Frontend uses:

VITE_API_BASE=http://localhost:8080


Backend uses:

PORT=8080

🧠 Example Data Structure
{
  "name": "Engagement Ring 1",
  "popularityScore": 0.85,
  "weight": 2.1,
  "images": {
    "yellow": ".../EG085-Y.jpg",
    "rose": ".../EG085-R.jpg",
    "white": ".../EG085-W.jpg"
  }
}

🧪 Validation Logic (Contact Form)

All fields (Name, Email, Subject, Message) are required.

Shows:

✅ Success popup → “Message sent successfully.”

❌ Error popup → “Please fill out all fields.”
🧭 Navigation Overview
Page	Path	Description
Home	/	Product listing carousel
Detail	/product/:slug	Detailed view of a ring
About	/about	Company info + stats
Contact	/contact	Form & social links
Footer	Global	Appears on every page
🧱 Responsive Design
Device	Layout
Desktop	4 products per row
Tablet	2 products per row
Mobile	1 product per row with swipe