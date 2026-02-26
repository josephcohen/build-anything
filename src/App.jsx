import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Header from './components/Shared/Header'
import DesktopLayout from './components/Layout/DesktopLayout'
import MobileTopTabs from './components/Layout/MobileTopTabs'
import MobileTabBar from './components/Layout/MobileTabBar'
import MobileSwipe from './components/Layout/MobileSwipe'
import MobileSheet from './components/Layout/MobileSheet'
import MobileLayoutSwitcher from './components/Layout/MobileLayoutSwitcher'
import ProjectsGallery from './components/Projects/ProjectsGallery'
import { useChat } from './hooks/useChat'
import { useProjects } from './hooks/useProjects'
import { useMobileLayout } from './hooks/useMobileLayout'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}

function BuilderView({ project, updateProject, createProject }) {
  const [html, setHtml] = useState(project?.html || '')
  const isMobile = useIsMobile()
  const { layout, setLayout } = useMobileLayout()

  const handleHtmlUpdate = useCallback((newHtml) => {
    setHtml(newHtml)
    if (project) {
      updateProject(project.id, { html: newHtml })
    }
  }, [project, updateProject])

  const { messages, isLoading, sendMessage } = useChat(
    project?.messages || [],
    handleHtmlUpdate
  )

  // Persist messages back to project
  useEffect(() => {
    if (project && messages.length > 0) {
      updateProject(project.id, { messages })
    }
  }, [messages, project, updateProject])

  // Update title from first user message if still "Untitled Project"
  useEffect(() => {
    if (project?.title === 'Untitled Project' && messages.length > 0) {
      const firstUserMsg = messages.find(m => m.role === 'user')
      if (firstUserMsg) {
        const title = firstUserMsg.text.slice(0, 40) + (firstUserMsg.text.length > 40 ? '...' : '')
        updateProject(project.id, { title })
      }
    }
  }, [messages, project, updateProject])

  if (isMobile) {
    return (
      <>
        {layout === 'top-tabs' && (
          <MobileTopTabs
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            html={html}
          />
        )}
        {layout === 'tabs' && (
          <MobileTabBar
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            html={html}
          />
        )}
        {layout === 'swipe' && (
          <MobileSwipe
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            html={html}
          />
        )}
        {layout === 'sheet' && (
          <MobileSheet
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            html={html}
          />
        )}
        <MobileLayoutSwitcher currentLayout={layout} onChangeLayout={setLayout} />
      </>
    )
  }

  return (
    <DesktopLayout
      messages={messages}
      isLoading={isLoading}
      onSend={sendMessage}
      html={html}
    />
  )
}

function ProjectRoute({ projects, updateProject, createProject }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)

  useEffect(() => {
    if (!project) {
      navigate('/', { replace: true })
    }
  }, [project, navigate])

  if (!project) return null

  return (
    <BuilderView
      key={project.id}
      project={project}
      updateProject={updateProject}
      createProject={createProject}
    />
  )
}

export default function App() {
  const { projects, createProject, updateProject, deleteProject } = useProjects()

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        onNewProject={createProject}
      />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProjectsGallery
                projects={projects}
                onNewProject={createProject}
                onDeleteProject={deleteProject}
              />
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProjectRoute
                projects={projects}
                updateProject={updateProject}
                createProject={createProject}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}
