import type { Project, Experience, Publication, SkillGroup, SocialLink } from '../types'

export const personalInfo = {
  name: 'Dickson E',
  title: 'AI Engineer & ML Systems Architect',
  location: 'Global / Remote',
  bio: 'Engineering scalable deep learning systems, agentic architectures, and high-performance LLM infrastructure.',
  headline: 'Building Autonomous Systems & Next-Gen Neural Architectures',
}

export const socialLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
  { platform: 'x', url: 'https://x.com', label: 'X / Twitter' },
  { platform: 'email', url: 'mailto:contact@example.com', label: 'Email' },
]

export const skillsData: SkillGroup[] = [
  {
    category: 'Core AI & Deep Learning',
    skills: ['PyTorch', 'JAX', 'Transformers', 'Diffusion Models', 'RLHF', 'Fine-tuning (LoRA/QLoRA)'],
  },
  {
    category: 'LLMs & Agentic Systems',
    skills: ['LangChain / LangGraph', 'LlamaIndex', 'RAG Architectures', 'DSPy', 'Multi-Agent Orchestration'],
  },
  {
    category: 'MLOps & High-Performance Inference',
    skills: ['vLLM', 'TensorRT-LLM', 'Triton', 'Docker & Kubernetes', 'Ray / Ray Train', 'MLflow & Weights & Biases'],
  },
  {
    category: 'Full-Stack & Deployment',
    skills: ['Python', 'FastAPI', 'TypeScript', 'React', 'Tailwind CSS', 'PostgreSQL / pgvector'],
  },
]

export const projectsData: Project[] = []
export const experienceData: Experience[] = []
export const publicationsData: Publication[] = []
