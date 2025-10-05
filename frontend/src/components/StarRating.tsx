import React from 'react'

export default function StarRating({
  value,            // 0..5
  size = 18,
  showText = true,
}: { value: number; size?: number; showText?: boolean }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.25 && value - full < 0.75
  const empty = 5 - full - (hasHalf ? 1 : 0)

  const Star = ({fill='none'}:{fill?:'full'|'half'|'none'}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{display:'block'}}>
      <path d="M12 3.6l2.7 5.46 6.03.88-4.36 4.25 1.03 6.01L12 17.9 6.6 20.2l1.03-6.01L3.27 9.94l6.03-.88L12 3.6z"
            fill="none" stroke="#E5B840" strokeWidth="1.5"/>
      {fill !== 'none' && (
        <clipPath id="starClip"><path d="M12 3.6l2.7 5.46 6.03.88-4.36 4.25 1.03 6.01L12 17.9 6.6 20.2l1.03-6.01L3.27 9.94l6.03-.88L12 3.6z"/></clipPath>
      )}
      {fill === 'full' && (
        <rect x="0" y="0" width="24" height="24" fill="#FFC84A" clipPath="url(#starClip)" />
      )}
      {fill === 'half' && (
        <rect x="0" y="0" width="12" height="24" fill="#FFC84A" clipPath="url(#starClip)" />
      )}
    </svg>
  )

  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
      {Array.from({length: full}).map((_,i)=><Star key={`f${i}`} fill="full"/>)}
      {hasHalf && <Star fill="half" />}
      {Array.from({length: empty}).map((_,i)=><Star key={`e${i}`} fill="none"/>)}
      {showText && <span style={{color:'#555', fontWeight:600}}>{value.toFixed(1)}/5</span>}
    </div>
  )
}
