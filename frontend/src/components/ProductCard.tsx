import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductDTO } from '../api/types'
import { ColorPicker } from './ColorPicker'
import StarRating from './StarRating'

const slugify = (s: string) =>
  s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

export default function ProductCard({
  item,
  onInteract,
}: {
  item: ProductDTO
  onInteract?: () => void
}) {
  // colors güvenliği (veri eksik olsa bile patlamasın)
  const initialColor = item.colors?.[0] ?? ('yellow' as keyof typeof item.images)
  const [color, setColor] = useState(initialColor)

  const slug = useMemo(() => slugify(item.name), [item.name])

  // seçilen renge göre görsel
  const img = item.images[color] ?? Object.values(item.images)[0]

  // fiyat formatı
  const priceText = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(item.priceUSD),
    [item.priceUSD]
  )

  // yıldız puanı (0..5, 1 ondalık)
  const score5 = useMemo(() => {
    if (typeof (item as any).popularity5 === 'number') {
      return Number((item as any).popularity5.toFixed(1))
    }
    // fallback: popularityScore (0..1) -> 0..5
    return Number(((item.popularityScore ?? 0) * 5).toFixed(1))
  }, [item])

  return (
    <div className="card">
      <Link to={`/product/${slug}`} state={{ item }}>
        <img
          src={img}
          alt={`${item.name} - ${color}`}
          style={{ width: '100%', borderRadius: 12, display: 'block' }}
        />
      </Link>

      <Link to={`/product/${slug}`} state={{ item }} className="title">
        {item.name}
      </Link>
      <div className="price">{priceText}</div>

      <ColorPicker
        colors={item.colors ?? Object.keys(item.images)}
        value={color}
        onChange={(c) => {
          setColor(c as any)
          onInteract?.()
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <StarRating value={score5} />
      </div>
    </div>
  )
}
