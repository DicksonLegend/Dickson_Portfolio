export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  category: string
  tags: string[]
  metrics?: { label: string; value: string }[]
  demoUrl?: string
  githubUrl?: string
  paperUrl?: string
  featured?: boolean
  accentColor?: string
  feelWord?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
  arxivUrl?: string
  codeUrl?: string
  abstract?: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'scholar' | 'email'
  url: string
  label: string
}
