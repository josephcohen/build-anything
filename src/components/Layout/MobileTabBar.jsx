import { useState } from 'react'
import ChatPanel from '../Chat/ChatPanel'
import PreviewPanel from '../Preview/PreviewPanel'
import styles from './Layout.module.css'

export default function MobileTabBar({ messages, isLoading, onSend, html }) {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <>
      <div className={styles.tabContent}>
        {activeTab === 'chat' && (
          <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} />
        )}
        {activeTab === 'preview' && (
          <PreviewPanel html={html} />
        )}
      </div>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === 'chat' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <svg className={styles.tabIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'preview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <svg className={styles.tabIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Preview
        </button>
      </div>
    </>
  )
}
