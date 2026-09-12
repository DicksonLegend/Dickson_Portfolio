import React from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '@/data/portfolioData'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)


export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="relative min-h-screen w-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-400 pl-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-5xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
            01 // PORTFOLIO
          </span>
          <span className="h-px w-12 bg-[var(--accent)]" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)] mb-6">
          Featured Engineering Work
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mb-12">
          Autonomous agents, RAG systems, and full-stack machine learning platforms built for high scalability and real-world impact.
        </p>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[var(--accent-glow)]/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono tracking-widest text-[var(--accent)] px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 uppercase">
                  {project.category}
                </span>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="p-2 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--accent)]" />
              </h3>

              <p className="text-xs font-mono text-[var(--text-faint)] mt-1 mb-3">
                {project.tagline}
              </p>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-subtle)]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
