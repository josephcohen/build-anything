import { useState, useCallback, useRef } from 'react'
import ChatPanel from '../Chat/ChatPanel'
import PreviewPanel from '../Preview/PreviewPanel'
import styles from './Layout.module.css'

export default function DesktopLayout({ messages, isLoading, onSend, html }) {
  const [chatWidth, setChatWidth] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)

    const onMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = Math.max(260, Math.min(e.clientX - rect.left, rect.width - 300))
      setChatWidth(newWidth)
    }

    const onMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <div className={styles.desktop} ref={containerRef}>
      <div className={styles.chatSide} style={chatWidth ? { width: chatWidth } : undefined}>
        <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} />
      </div>
      <div
        className={`${styles.divider} ${isDragging ? styles.dividerActive : ''}`}
        onMouseDown={handleMouseDown}
      />
      <div className={styles.previewSide}>
        <PreviewPanel html={html} />
      </div>
    </div>
  )
}
