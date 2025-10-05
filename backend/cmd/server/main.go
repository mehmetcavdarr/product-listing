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
		AllowOrigins: "http://localhost:5173",
		AllowMethods: "GET,HEAD,OPTIONS",
		AllowHeaders: "*",
	}))

	productsPath := "./data/products.json"
	if v := os.Getenv("PRODUCTS_PATH"); v != "" {
		productsPath = v
	}
	goldKey := os.Getenv("METALS_API_KEY")

	internal.RegisterRoutes(app, internal.ServerDeps{
		ProductsPath: productsPath,
		GoldAPIKey:   goldKey,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("listening on :%s", port)
	log.Fatal(app.Listen(":" + port))
}
