package internal

type Product struct {
	Name            string            `json:"name"`
	PopularityScore float64           `json:"popularityScore"`
	Weight          float64           `json:"weight"`
	Images          map[string]string `json:"images"`
}

type ProductDTO struct {
	Name            string            `json:"name"`
	Weight          float64           `json:"weight"`
	PopularityScore float64           `json:"popularityScore"`
	Popularity5     float64           `json:"popularity5"`
	PriceUSD        float64           `json:"priceUSD"`
	Images          map[string]string `json:"images"`
	Colors          []string          `json:"colors"`
}

type APIResponse struct {
	Items []ProductDTO `json:"items"`
	Meta  Meta         `json:"meta"`
}

type Meta struct {
	Count         int     `json:"count"`
	GoldPriceGram float64 `json:"goldPriceGram"`
	Currency      string  `json:"currency"`
}
