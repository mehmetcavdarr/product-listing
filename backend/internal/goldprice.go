package internal

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"
)

type goldCache struct {
	value float64
	until time.Time
}

var cache goldCache

func GetGoldPriceGram(apiKey string) (float64, error) {
	if cache.value > 0 && time.Now().Before(cache.until) {
		return cache.value, nil
	}
	if apiKey == "" {
		return 75.0 / 31.1034768, nil
	}

	url := "https://api.metals-api.com/v1/latest?base=USD&symbols=XAU&access_key=" + apiKey
	r, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer r.Body.Close()
	if r.StatusCode != 200 {
		return 0, errors.New("gold api status != 200")
	}

	var payload struct {
		Rates map[string]float64 `json:"rates"`
	}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		return 0, err
	}
	xau := payload.Rates["XAU"]
	if xau == 0 {
		return 0, errors.New("missing XAU")
	}
	ouncePerUSD := xau // ounce per USD
	usdPerOunce := 1.0 / ouncePerUSD
	usdPerGram := usdPerOunce / 31.1034768

	cache = goldCache{value: usdPerGram, until: time.Now().Add(5 * time.Minute)}
	return usdPerGram, nil
}
