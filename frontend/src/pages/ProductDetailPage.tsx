import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { fetchProducts } from '../api/client'
import type { ProductDTO, ProductsResponse } from '../api/types'
import { ColorPicker } from '../components/ColorPicker'

const slugify = (s: string) =>
  s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

export default function ProductDetailPage() {
  const { slug } = useParams()
  const location = useLocation() as { state?: { item?: ProductDTO } }
  const [data, setData] = useState<ProductsResponse | null>(null)

  // Liste sayfasından state geldiyse onu kullan, gelmediyse API'den bul
  const itemFromState = location.state?.item
  useEffect(() => {
    if (itemFromState) return
    fetchProducts().then(setData)
  }, [itemFromState])

  const item: ProductDTO | undefined = useMemo(() => {
    if (itemFromState) return itemFromState
    return data?.items.find(p => slugify(p.name) === slug)
  }, [data, itemFromState, slug])

  const [color, setColor] = useState(item?.colors?.[0] ?? 'yellow')
  useEffect(() => { if (item) setColor(item.colors[0]) }, [item])

  if (!item) {
    return (
      <div className="wrapper">
        <div style={{marginBottom:12}}><Link to=" / ">← Back to list</Link></div>
        Loading…
      </div>
    )
  }

  const img = item.images[color] || item.images[item.colors[0]]
  const priceText = new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' })
    .format(item.priceUSD)

  return (
    <div className="wrapper">
      <div className="list-header" style={{marginBottom:16}}>
        <Link to="/" className="small">← Back</Link>
        <h1 className="h1" style={{marginLeft:'auto'}}>{item.name}</h1>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div>
          <img src={img} alt={`${item.name} - ${color}`} style={{width:'100%', borderRadius:12}} />
        </div>

        <div>
          <div className="price" style={{fontSize:24, marginBottom:12}}>{priceText}</div>
          <ColorPicker colors={item.colors} value={color} onChange={setColor} />

          <div style={{marginTop:16, color:'#666'}}>
            <div><strong>Popularity:</strong> {item.popularity5.toFixed(1)}/5</div>
            <div><strong>Weight:</strong> {item.weight} g</div>
          </div>
        </div>
      </div>
    </div>
  )
}
