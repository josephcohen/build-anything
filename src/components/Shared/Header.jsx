import { Link, useNavigate } from 'react-router-dom'
import styles from './Shared.module.css'

export default function Header({ projectName, onNewProject }) {
  const navigate = useNavigate()

  const handleNew = () => {
    if (onNewProject) {
      const project = onNewProject()
      navigate(`/project/${project.id}`)
    }
  }

  return (
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>B</div>
          Build Anything
        </Link>
        {projectName && (
          <span className={styles.projectName}>{projectName}</span>
        )}
      </div>
      <div className={styles.headerRight}>
        <Link to="/" className={styles.navLink}>All Projects</Link>
        <button className={styles.newProjectBtn} onClick={handleNew}>
          + New
        </button>
      </div>
    </header>
  )
}
