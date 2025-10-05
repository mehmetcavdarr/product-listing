package internal

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type ServerDeps struct {
	ProductsPath string
	GoldAPIKey   string
}

func RegisterRoutes(app *fiber.App, deps ServerDeps) {
	app.Get("/health", func(c *fiber.Ctx) error { return c.JSON(fiber.Map{"status": "ok"}) })

	app.Get("/gold/spot", func(c *fiber.Ctx) error {
		g, err := GetGoldPriceGram(deps.GoldAPIKey)
		if err != nil {
			return c.Status(502).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(fiber.Map{"goldPriceGram": g, "currency": "USD"})
	})

	app.Get("/products", func(c *fiber.Ctx) error {
		prods, err := LoadProductsJSON(deps.ProductsPath)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		g, err := GetGoldPriceGram(deps.GoldAPIKey)
		if err != nil {
			return c.Status(502).JSON(fiber.Map{"error": err.Error()})
		}
		dtos := ToDTOs(prods, g)

		// filters
		var pmin, pmax, popmin, popmax *float64
		if v := c.Query("priceMin"); v != "" {
			if f, err := strconv.ParseFloat(v, 64); err == nil {
				pmin = &f
			}
		}
		if v := c.Query("priceMax"); v != "" {
			if f, err := strconv.ParseFloat(v, 64); err == nil {
				pmax = &f
			}
		}
		if v := c.Query("popMin"); v != "" {
			if f, err := strconv.ParseFloat(v, 64); err == nil {
				popmin = &f
			}
		}
		if v := c.Query("popMax"); v != "" {
			if f, err := strconv.ParseFloat(v, 64); err == nil {
				popmax = &f
			}
		}
		dtos = FilterByPrice(dtos, pmin, pmax)
		dtos = FilterByPopularity(dtos, popmin, popmax)

		return c.JSON(APIResponse{Items: dtos, Meta: Meta{Count: len(dtos), GoldPriceGram: g, Currency: "USD"}})
	})
}
