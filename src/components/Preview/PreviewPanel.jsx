import { useCallback } from 'react'
import styles from './Preview.module.css'

export default function PreviewPanel({ html }) {
  const handleRefresh = useCallback(() => {
    const iframe = document.querySelector(`.${styles.iframe}`)
    if (iframe) {
      iframe.srcdoc = html || ''
    }
  }, [html])

  const handleOpenExternal = useCallback(() => {
    if (!html) return
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [html])

  if (!html) {
    return (
      <div className={styles.panel}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <svg className={styles.toolbarIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span className={styles.toolbarTitle}>Preview</span>
          </div>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div className={styles.emptyTitle}>Live preview</div>
          <div className={styles.emptyHint}>
            Your app will appear here as you describe it in the chat
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <svg className={styles.toolbarIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span className={styles.toolbarTitle}>Preview</span>
        </div>
        <div className={styles.toolbarActions}>
          <button
            className={styles.toolbarBtn}
            onClick={handleRefresh}
            title="Refresh preview"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
          <button
            className={styles.toolbarBtn}
            onClick={handleOpenExternal}
            title="Open in new tab"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          srcDoc={html}
          title="App preview"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}
