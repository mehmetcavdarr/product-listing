package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/mehmetcvdr/product-listing/backend/internal"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, https://product-list-one-puce.vercel.app",
		AllowMethods: "GET,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	productsPath := "./data/products.json"
	if v := os.Getenv("PRODUCTS_PATH"); v != "" {
		productsPath = v
	}

	internal.RegisterRoutes(app, internal.ServerDeps{
		ProductsPath: productsPath,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	log.Printf("📦 Products file: %s", productsPath)
	log.Printf("💰 Using GOLD_API_KEY from environment for live gold price")

	log.Fatal(app.Listen(":" + port))
}
