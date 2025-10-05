
export type Images = Record<string, string>


export interface ProductDTO {
name: string
weight: number
popularityScore: number // 0..1
popularity5: number
priceUSD: number
images: Images
colors: string[]
}


export interface ProductsResponse {
items: ProductDTO[]
meta: { count: number; goldPriceGram: number; currency: 'USD' }
}