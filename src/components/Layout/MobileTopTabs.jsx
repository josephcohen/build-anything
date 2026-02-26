import { useState } from 'react'
import ChatPanel from '../Chat/ChatPanel'
import PreviewPanel from '../Preview/PreviewPanel'
import styles from './Layout.module.css'

export default function MobileTopTabs({ messages, isLoading, onSend, html }) {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className={styles.topTabsContainer}>
      <div className={styles.topTabBar}>
        <button
          className={`${styles.topTab} ${activeTab === 'chat' ? styles.topTabActive : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`${styles.topTab} ${activeTab === 'preview' ? styles.topTabActive : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>
      <div className={styles.topTabContent}>
        {activeTab === 'chat' && (
          <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} />
        )}
        {activeTab === 'preview' && (
          <PreviewPanel html={html} />
        )}
      </div>
    </div>
  )
}
