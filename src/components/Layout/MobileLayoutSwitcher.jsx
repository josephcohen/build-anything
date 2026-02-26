import { useState } from 'react'
import styles from './Layout.module.css'

const LAYOUT_OPTIONS = [
  { key: 'top-tabs', label: 'Top Tabs' },
  { key: 'tabs', label: 'Bottom Tabs' },
  { key: 'swipe', label: 'Swipe' },
  { key: 'sheet', label: 'Bottom Sheet' },
]

function LayoutIcon({ type }) {
  if (type === 'top-tabs') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="12" y1="3" x2="12" y2="8"/>
      </svg>
    )
  }
  if (type === 'tabs') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="18" x2="21" y2="18"/><line x1="12" y1="18" x2="12" y2="21"/>
      </svg>
    )
  }
  if (type === 'swipe') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/><polyline points="21 18 15 12 21 6"/><line x1="3" y1="6" x2="3" y2="18"/>
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/>
    </svg>
  )
}

export default function MobileLayoutSwitcher({ currentLayout, onChangeLayout }) {
  const [open, setOpen] = useState(false)

  const needsBottomOffset = currentLayout === 'tabs'

  return (
    <div className={`${styles.layoutSwitcher} ${needsBottomOffset ? '' : styles.layoutSwitcherSheet}`}>
      {open && (
        <div className={styles.fabMenu}>
          {LAYOUT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`${styles.fabMenuItem} ${currentLayout === opt.key ? styles.fabMenuItemActive : ''}`}
              onClick={() => {
                onChangeLayout(opt.key)
                setOpen(false)
              }}
            >
              <LayoutIcon type={opt.key} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-label="Switch layout"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
      </button>
    </div>
  )
}
