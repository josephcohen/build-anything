import styles from './Projects.module.css'

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  return date.toLocaleDateString()
}

export default function ProjectCard({ project, onClick, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation()
    if (confirm(`Delete "${project.title}"?`)) {
      onDelete(project.id)
    }
  }

  return (
    <div className={styles.card} onClick={() => onClick(project.id)}>
      <div className={styles.cardThumb}>
        {project.html ? (
          <iframe
            srcDoc={project.html}
            title={project.title}
            sandbox=""
            tabIndex={-1}
          />
        ) : (
          <div className={styles.cardThumbEmpty}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{project.title}</div>
        <div className={styles.cardMeta}>
          <span>{formatDate(project.updatedAt)}</span>
          <button
            className={styles.cardDelete}
            onClick={handleDelete}
            aria-label="Delete project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
