import React, { useEffect, useRef, useState } from 'react'
import { fetchProducts } from '../api/client'
import { ProductsResponse, ProductDTO } from '../api/types'
import ProductCard from '../components/ProductCard'
import '../styles.css'

export default function ProductListPage() {
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [cardW, setCardW] = useState(0)

  useEffect(() => {
    fetchProducts().then(setData).catch((e) => setErr(e.message))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('.p-card')
    if (first) setCardW(first.offsetWidth + 32) // gap 32px
  }, [data])

  const go = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el || !cardW) return
    const perView = Math.max(1, Math.floor(el.clientWidth / cardW))
    el.scrollBy({ left: dir * cardW * perView, behavior: 'smooth' })
  }

  // Drag sadece track'in boş alanında
  const isDown = useRef(false)
  const startX = useRef(0)
  const startLeft = useRef(0)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el) return

    const t = e.target as HTMLElement
    if (t.closest('.interactive') || t.closest('a') || t.tagName === 'BUTTON') return

    isDown.current = true
    startX.current = e.clientX
    startLeft.current = el.scrollLeft
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el || !isDown.current) return
    const dx = e.clientX - startX.current
    el.scrollLeft = startLeft.current - dx
  }
  const onPointerUp = () => {
    const el = trackRef.current
    if (!el || !isDown.current) return
    isDown.current = false
    if (!cardW) return
    const idx = Math.round(el.scrollLeft / cardW)
    el.scrollTo({ left: idx * cardW, behavior: 'smooth' })
  }

  const ensureVisible = (index: number) => {
    const el = trackRef.current
    if (!el || !cardW) return
    const left = index * cardW
    const right = left + cardW
    const viewLeft = el.scrollLeft
    const viewRight = viewLeft + el.clientWidth
    if (left < viewLeft) el.scrollTo({ left, behavior: 'smooth' })
    else if (right > viewRight) el.scrollTo({ left: right - el.clientWidth, behavior: 'smooth' })
  }

  if (err) return <div className="wrapper"><div className="list-header"><h1 className="h1">Product List</h1></div><pre>{err}</pre></div>
  if (!data) return <div className="wrapper"><div className="list-header"><h1 className="h1">Product List</h1></div>Loading…</div>

  const items = data.items as ProductDTO[]

  return (
    <div className="wrapper">
      <div className="list-header">
        <h1 className="h1">Product List</h1>
        {/* başlıktaki nav'ı kaldırıyoruz; oklar artık yanlarda */}
      </div>
  
      {/* YAN OKLARLI CAROUSEL */}
      <div className="list-carousel side-arrows">
        {/* sol ok */}
        <button
          className="side-arrow left"
          onClick={() => go(-1)}
          aria-label="Previous"
        >
          ‹
        </button>
  
        <div
          className="list-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {items.map((p, idx) => (
            <div className="p-card" key={`${p.name}-${idx}`}>
              <ProductCard item={p} onInteract={() => ensureVisible(idx)} />
            </div>
          ))}
        </div>
  
        {/* sağ ok */}
        <button
          className="side-arrow right"
          onClick={() => go(1)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  )
}
