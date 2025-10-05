package internal

import (
	"encoding/json"
	"errors"
	"math"
	"os"
)

func LoadProductsJSON(path string) ([]Product, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var items []Product
	if err := json.Unmarshal(b, &items); err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, errors.New("no products")
	}
	return items, nil
}

func ToDTOs(products []Product, goldPerGram float64) []ProductDTO {
	res := make([]ProductDTO, 0, len(products))
	for _, p := range products {
		colors := make([]string, 0, len(p.Images))
		for c := range p.Images {
			colors = append(colors, c)
		}

		price := (p.PopularityScore + 1.0) * p.Weight * goldPerGram
		pop5 := math.Round(((p.PopularityScore * 5.0) * 10.0)) / 10.0 // 1 decimal

		res = append(res, ProductDTO{
			Name:            p.Name,
			Weight:          p.Weight,
			PopularityScore: p.PopularityScore,
			Popularity5:     pop5,
			PriceUSD:        math.Round(price*100.0) / 100.0,
			Images:          p.Images,
			Colors:          colors,
		})
	}
	return res
}

// Filters
func FilterByPrice(items []ProductDTO, min, max *float64) []ProductDTO {
	min, max = normalizeRangeFloat(min, max)
	if min == nil && max == nil {
		return items
	}
	out := make([]ProductDTO, 0, len(items))
	for _, it := range items {
		if min != nil && it.PriceUSD < *min {
			continue
		}
		if max != nil && it.PriceUSD > *max {
			continue
		}
		out = append(out, it)
	}
	return out
}
func normalizeRangeFloat(min, max *float64) (nmin, nmax *float64) {
	if min == nil && max == nil {
		return nil, nil
	}
	var a, b *float64
	if min != nil {
		v := *min
		a = &v
	}
	if max != nil {
		v := *max
		b = &v
	}
	if a != nil && b != nil && *a > *b {
		*a, *b = *b, *a
	}
	return a, b
}

func FilterByPopularity(items []ProductDTO, min, max *float64) []ProductDTO {
	min, max = normalizeRangeFloat(min, max)
	if min == nil && max == nil {
		return items
	}
	out := make([]ProductDTO, 0, len(items))
	for _, it := range items {
		if min != nil && it.Popularity5 < *min {
			continue
		}
		if max != nil && it.Popularity5 > *max {
			continue
		}
		out = append(out, it)
	}
	return out
}
