import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'build-anything-projects'

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function useProjects() {
  const [projects, setProjects] = useState(loadProjects)

  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  const createProject = useCallback((title = 'Untitled Project') => {
    const project = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      html: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setProjects(prev => [project, ...prev])
    return project
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
      )
    )
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id) || null
  }, [projects])

  return { projects, createProject, updateProject, deleteProject, getProject }
}
