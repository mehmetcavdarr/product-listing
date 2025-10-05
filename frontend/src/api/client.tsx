
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'


export async function fetchProducts(params: Record<string, string|number> = {}) {
const qs = new URLSearchParams()
Object.entries(params).forEach(([k,v]) => qs.set(k, String(v)))
const res = await fetch(`${BASE}/products?${qs.toString()}`)
if (!res.ok) throw new Error('Failed to fetch products')
return res.json()
}
