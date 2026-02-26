import styles from './Chat.module.css'

function AttachmentIcon({ type }) {
  if (type === 'image') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    )
  }
  if (type === 'url') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    )
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant}`}>
      {isUser && message.attachments?.length > 0 && (
        <div className={styles.attachmentsList}>
          {message.attachments.map(att => (
            <span key={att.id} className={styles.attachmentChip}>
              <AttachmentIcon type={att.type} />
              {att.name}
            </span>
          ))}
        </div>
      )}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        {message.text}
      </div>
      {!isUser && message.html && (
        <div className={styles.htmlPreview}>
          <iframe
            srcDoc={message.html}
            title="Preview snippet"
            sandbox="allow-scripts"
          />
        </div>
      )}
    </div>
  )
}
