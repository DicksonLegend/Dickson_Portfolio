import type { Project, Experience, Publication, SkillGroup, SocialLink } from '../types'

export const personalInfo = {
  name: 'Dickson E',
  title: 'Developer',
  subtitle: "Trichy, India · AI & Data Science Undergrad · B.Tech '27",
  location: 'Trichy, India',
  phone: '+91 9344970491',
  email: 'dicksone2006@gmail.com',
  bio: 'Artificial Intelligence and Data Science undergraduate with hands-on experience in Python, SQL, machine learning, AI application development, and data analytics. Skilled in building AI-powered applications and scalable web solutions using FastAPI, React, and LLM frameworks.',
  roles: [
    'AI Engineer',
    'ML Engineer',
    'Fullstack Engineer',
    'Data Scientist',
  ],
  education: {
    degree: 'B.Tech in Artificial Intelligence and Data Science (CGPA: 8.52/10)',
    institution: 'Karunya Institute of Technology and Sciences, Coimbatore, India',
    period: 'Aug 2023 – Mar 2027',
  },
}

export const socialLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/DicksonLegend', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
  { platform: 'email', url: 'mailto:dicksone2006@gmail.com', label: 'Email' },
]

export const projectsData: Project[] = [
  {
    id: 'modelmatch-ai',
    title: 'ModelMatch-AI',
    tagline: 'AI Model Recommendation Platform',
    description: 'Engineered a full-stack platform to compare 30+ AI models across pricing, benchmarks, and deployment requirements using FastAPI and React.',
    category: 'LLMs & Agents',
    tags: ['FastAPI', 'React', 'LLMs', 'Benchmarking', 'Python'],
    metrics: [{ label: 'Models Analyzed', value: '30+' }],
    githubUrl: 'https://github.com/DicksonLegend',
    featured: true,
  },
  {
    id: 'edurag',
    title: 'EduRAG',
    tagline: 'Personalized AI Learning Assistant',
    description: 'Developed an AI-powered learning assistant using Retrieval-Augmented Generation (RAG) for contextual document-based question answering with FAISS vector retrieval.',
    category: 'LLMs & Agents',
    tags: ['RAG', 'FAISS', 'LangChain', 'Python', 'Vector Search'],
    githubUrl: 'https://github.com/DicksonLegend',
    featured: true,
  },
  {
    id: 'aira',
    title: 'AIRA',
    tagline: 'Multi-Agent AI Decision System',
    description: 'Architected the backend framework for a multi-agent AI system enabling structured and collaborative decision-making workflows with explainable recommendations.',
    category: 'ML Systems',
    tags: ['Multi-Agent', 'FastAPI', 'Autonomous Agents', 'Python'],
    githubUrl: 'https://github.com/DicksonLegend',
    featured: true,
  },
  {
    id: 'artisian-connect',
    title: 'Artisian-Connect',
    tagline: 'AI-Powered Marketplace Platform',
    description: 'Developed a digital marketplace platform connecting artisans with customers, featuring AI-powered smart content generation and product discovery.',
    category: 'ML Systems',
    tags: ['React', 'FastAPI', 'Generative AI', 'Fullstack'],
    githubUrl: 'https://github.com/DicksonLegend',
    featured: false,
  },
]

export const skillsData: SkillGroup[] = [
  {
    category: 'Programming & Databases',
    skills: ['Python', 'SQL', 'Java', 'MongoDB', 'FAISS'],
  },
  {
    category: 'Machine Learning & AI',
    skills: ['Scikit-learn', 'TensorFlow', 'Generative AI', 'RAG', 'LangChain'],
  },
  {
    category: 'Full-Stack Development',
    skills: ['React.js', 'FastAPI', 'Flask', 'REST APIs', 'HTML5 & CSS'],
  },
  {
    category: 'Tools & Deployment',
    skills: ['Docker', 'Git & GitHub', 'Render', 'Netlify', 'VS Code'],
  },
]

export const experienceData: Experience[] = []
export const publicationsData: Publication[] = []
