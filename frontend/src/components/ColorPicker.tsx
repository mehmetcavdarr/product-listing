import React from 'react'

const colorLabel: Record<string, string> = {
  yellow: 'Yellow Gold',
  white: 'White Gold',
  rose: 'Rose Gold',
}

const colorToCSS: Record<string, string> = {
  yellow: '#E6CA97',
  white: '#D9D9D9',
  rose: '#E1A4A9',
}

export function ColorPicker({
  colors,
  value,
  onChange,
}: {
  colors: string[]
  value: string
  onChange: (v: string) => void
}) {
  // drag ile çakışmasın:
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div className="interactive" onPointerDown={stop} onMouseDown={stop} onTouchStart={stop}>
      <div className="color-row">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={`swatch ${value === c ? 'selected' : ''}`}
            style={{ background: colorToCSS[c] || '#ddd' }}
            onClick={(e) => {
              e.stopPropagation()
              onChange(c)
            }}
            aria-label={colorLabel[c] || c}
            title={colorLabel[c] || c}
          />
        ))}
      </div>
      <div className="small">{colorLabel[value] || value}</div>
    </div>
  )
}
