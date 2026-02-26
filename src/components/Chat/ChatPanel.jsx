import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import styles from './Chat.module.css'

export default function ChatPanel({ messages, isLoading, onSend }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <svg className={styles.panelHeaderIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className={styles.panelHeaderTitle}>Chat</span>
      </div>
      <div className={styles.messages}>
        {messages.length === 0 && !isLoading && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className={styles.emptyTitle}>What do you want to build?</div>
            <div className={styles.emptyHint}>
              Try "Build me a recipe app" or "Create a portfolio site"
            </div>
          </div>
        )}
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className={styles.typing}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  )
}
