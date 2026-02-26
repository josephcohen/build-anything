import { useNavigate } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

export default function ProjectsGallery({ projects, onNewProject, onDeleteProject }) {
  const navigate = useNavigate()

  const handleCardClick = (id) => {
    navigate(`/project/${id}`)
  }

  const handleNew = () => {
    const project = onNewProject()
    navigate(`/project/${project.id}`)
  }

  if (projects.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIconLarge}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <h1 className={styles.emptyTitle}>Start building something</h1>
          <p className={styles.emptyHint}>
            Describe any app, site, or tool and watch it come to life in seconds.
          </p>
          <button className={styles.createBtn} onClick={handleNew}>
            Create your first project
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeader}>
        <h1 className={styles.galleryTitle}>
          Projects
          <span className={styles.galleryCount}>({projects.length})</span>
        </h1>
        <button className={styles.newBtn} onClick={handleNew}>
          + New Project
        </button>
      </div>
      <div className={styles.grid}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={handleCardClick}
            onDelete={onDeleteProject}
          />
        ))}
      </div>
    </div>
  )
}
