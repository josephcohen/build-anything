import { useState, useRef, useCallback } from 'react'
import ChatPanel from '../Chat/ChatPanel'
import PreviewPanel from '../Preview/PreviewPanel'
import styles from './Layout.module.css'

export default function MobileSwipe({ messages, isLoading, onSend, html }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const startXRef = useRef(0)
  const isDraggingRef = useRef(false)

  const handleTouchStart = useCallback((e) => {
    startXRef.current = e.touches[0].clientX
    isDraggingRef.current = true
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < 1) {
        setActiveIndex(1)
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(0)
      }
    }
  }, [activeIndex])

  return (
    <div className={styles.swipeContainer}>
      <div className={styles.swipeDots}>
        <div className={`${styles.swipeDot} ${activeIndex === 0 ? styles.swipeDotActive : ''}`} />
        <div className={`${styles.swipeDot} ${activeIndex === 1 ? styles.swipeDotActive : ''}`} />
      </div>
      <div
        className={styles.swipeTrack}
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.swipePanel}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} />
        </div>
        <div
          className={styles.swipePanel}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <PreviewPanel html={html} />
        </div>
      </div>
    </div>
  )
}
