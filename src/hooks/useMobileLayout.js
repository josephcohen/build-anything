import { useState, useCallback } from 'react'

const STORAGE_KEY = 'build-anything-mobile-layout'
const LAYOUTS = ['top-tabs', 'tabs', 'swipe', 'sheet']

function loadLayout() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && LAYOUTS.includes(saved)) return saved
  } catch {}
  return 'top-tabs'
}

export function useMobileLayout() {
  const [layout, setLayoutState] = useState(loadLayout)

  const setLayout = useCallback((newLayout) => {
    if (LAYOUTS.includes(newLayout)) {
      setLayoutState(newLayout)
      localStorage.setItem(STORAGE_KEY, newLayout)
    }
  }, [])

  return { layout, setLayout, layouts: LAYOUTS }
}
