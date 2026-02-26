import { useState, useRef, useCallback } from 'react'
import ChatPanel from '../Chat/ChatPanel'
import PreviewPanel from '../Preview/PreviewPanel'
import styles from './Layout.module.css'

const SHEET_STATES = ['collapsed', 'half', 'full']

export default function MobileSheet({ messages, isLoading, onSend, html }) {
  const [sheetState, setSheetState] = useState('collapsed')
  const startYRef = useRef(0)
  const containerRef = useRef(null)

  const getSheetTransform = () => {
    switch (sheetState) {
      case 'collapsed': return 'translateY(calc(100% - 48px))'
      case 'half': return 'translateY(50%)'
      case 'full': return 'translateY(0)'
      default: return 'translateY(calc(100% - 48px))'
    }
  }

  const handleTouchStart = useCallback((e) => {
    startYRef.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const diff = startYRef.current - e.changedTouches[0].clientY
    const currentIndex = SHEET_STATES.indexOf(sheetState)

    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < 2) {
        setSheetState(SHEET_STATES[currentIndex + 1])
      } else if (diff < 0 && currentIndex > 0) {
        setSheetState(SHEET_STATES[currentIndex - 1])
      }
    }
  }, [sheetState])

  const handleOverlayClick = () => {
    setSheetState('collapsed')
  }

  return (
    <div className={styles.sheetContainer} ref={containerRef}>
      <div className={styles.sheetMain}>
        <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} />
      </div>

      <div
        className={`${styles.sheetOverlay} ${sheetState !== 'collapsed' ? styles.sheetOverlayVisible : ''}`}
        onClick={handleOverlayClick}
      />

      <div
        className={styles.sheet}
        style={{
          transform: getSheetTransform(),
          height: '100%',
        }}
      >
        <div
          className={styles.sheetHandle}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            const idx = SHEET_STATES.indexOf(sheetState)
            setSheetState(SHEET_STATES[idx === 2 ? 0 : idx + 1])
          }}
        >
          <div className={styles.sheetHandleBar} />
        </div>
        <div className={styles.sheetContent}>
          <PreviewPanel html={html} />
        </div>
      </div>
    </div>
  )
}
