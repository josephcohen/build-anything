import { useState, useRef, useCallback } from 'react'
import { createImageAttachment, createFileAttachment, createUrlAttachment } from '../../utils/attachments'
import styles from './Chat.module.css'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const textareaRef = useRef(null)
  const imageInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed && attachments.length === 0) return
    onSend(trimmed, attachments)
    setText('')
    setAttachments([])
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [text, attachments, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }

  const handleImagePick = (e) => {
    const files = Array.from(e.target.files || [])
    const newAttachments = files.map(createImageAttachment)
    setAttachments(prev => [...prev, ...newAttachments])
    e.target.value = ''
  }

  const handleFilePick = (e) => {
    const files = Array.from(e.target.files || [])
    const newAttachments = files.map(createFileAttachment)
    setAttachments(prev => [...prev, ...newAttachments])
    e.target.value = ''
  }

  const handleUrlAdd = () => {
    const url = prompt('Enter a URL:')
    if (url?.trim()) {
      setAttachments(prev => [...prev, createUrlAttachment(url.trim())])
    }
  }

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className={styles.inputArea}>
      {attachments.length > 0 && (
        <div className={styles.inputAttachments}>
          {attachments.map(att => (
            <div key={att.id} className={styles.inputChip}>
              <svg className={styles.inputChipIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {att.type === 'image' && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>}
                {att.type === 'url' && <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>}
                {att.type === 'file' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
              </svg>
              <span className={styles.inputChipName}>{att.name}</span>
              <button
                className={styles.inputChipRemove}
                onClick={() => removeAttachment(att.id)}
                aria-label="Remove attachment"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.inputRow}>
        <div className={styles.attachWrapper}>
          <button
            className={styles.attachBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Attach"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          {menuOpen && (
            <div className={styles.attachMenu}>
              <button
                className={styles.attachMenuItem}
                onClick={() => { imageInputRef.current?.click(); setMenuOpen(false) }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                Image
              </button>
              <button
                className={styles.attachMenuItem}
                onClick={() => { fileInputRef.current?.click(); setMenuOpen(false) }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                File
              </button>
              <button
                className={styles.attachMenuItem}
                onClick={() => { handleUrlAdd(); setMenuOpen(false) }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                URL
              </button>
            </div>
          )}
        </div>
        <textarea
          ref={textareaRef}
          className={styles.textInput}
          placeholder="Describe what you want to build..."
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={disabled || (!text.trim() && attachments.length === 0)}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>
      </div>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleImagePick}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFilePick}
      />
    </div>
  )
}
