package internal

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type goldCache struct {
	value float64
	until time.Time
}

var cache goldCache

func getFallbackGoldPrice() float64 {
	return 75.0
}

func GetGoldPriceGram() (float64, error) {
	if cache.value > 0 && time.Now().Before(cache.until) {
		return cache.value, nil
	}

	url := "https://finans.truncgil.com/v4/today.json"
	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("UYARI: HTTP isteği oluşturulamadı: %v. Varsayılan fiyat kullanılacak.", err)
		return getFallbackGoldPrice(), nil
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
	r, err := client.Do(req)

	if err != nil {
		log.Printf("UYARI: Truncgil API'ye ulaşılamadı: %v. Varsayılan fiyat kullanılacak.", err)
		return getFallbackGoldPrice(), nil
	}
	defer r.Body.Close()

	if r.StatusCode != 200 {
		log.Printf("UYARI: Truncgil API status kodu %d döndü. Varsayılan fiyat kullanılacak.", r.StatusCode)
		return getFallbackGoldPrice(), nil
	}

	var payload map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		log.Printf("UYARI: Truncgil API JSON verisi işlenemedi: %v. Varsayılan fiyat kullanılacak.", err)
		return getFallbackGoldPrice(), nil
	}

	goldData, goldOK := payload["GRA"].(map[string]interface{})
	usdData, usdOK := payload["USD"].(map[string]interface{})

	if !goldOK || !usdOK {
		log.Printf("UYARI: Truncgil API yanıtında GRA veya USD anahtarı bulunamadı. Varsayılan fiyat kullanılacak.")
		return getFallbackGoldPrice(), nil
	}

	goldSellingTRY, goldSellingOK := goldData["Selling"].(float64)
	usdSellingTRY, usdSellingOK := usdData["Selling"].(float64)

	if !goldSellingOK || !usdSellingOK || usdSellingTRY == 0 {
		log.Printf("UYARI: Truncgil API yanıtında GRA veya USD için 'Selling' alanı bulunamadı veya sıfır. Varsayılan fiyat kullanılacak.")
		return getFallbackGoldPrice(), nil
	}

	usdPerGram := goldSellingTRY / usdSellingTRY

	cache = goldCache{value: usdPerGram, until: time.Now().Add(5 * time.Minute)}
	fmt.Printf("Anlık Gram Altın Fiyatı: %.2f USD\n", usdPerGram)
	return usdPerGram, nil
}
