import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Server,
  Cpu,
  Layers,
  Award,
  GraduationCap,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Activity,
  Workflow,
} from 'lucide-react'

type TabType = 'pipeline' | 'contrast' | 'credentials'

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline')
  const [activePipelineTier, setActivePipelineTier] = useState<number>(1)

  const certifications = [
    {
      title: 'Microsoft Azure AI Fundamentals',
      issuer: 'Microsoft',
      badge: 'Certified',
      year: '2024',
      highlight: 'Core AI workloads, NLP, and Computer Vision infrastructure',
    },
    {
      title: 'Developing Machine Learning Solutions',
      issuer: 'Amazon Web Services (AWS)',
      badge: 'Specialist',
      year: '2024',
      highlight: 'SageMaker pipeline modeling, scalable training & inference',
    },
    {
      title: 'Microservices & CI/CD Pipeline Builder',
      issuer: 'AWS Academy',
      badge: 'Graduate',
      year: '2024',
      highlight: 'Containerization, automated testing gates, and cloud deployment',
    },
    {
      title: 'Building GenAI Apps Learning Path',
      issuer: 'MongoDB',
      badge: 'Badge Path',
      year: '2024',
      highlight: 'Vector search indexing, LangChain orchestration, and embeddings',
    },
  ]

  const pipelineTiers = [
    {
      id: 0,
      tag: 'TIER 01',
      title: 'Client Ingress & Interaction',
      tech: 'React 19 · Vite · SSE Streams · WebSockets',
      latency: '< 45ms',
      description:
        'Fluid user interfaces capable of consuming token-by-token streaming inference, real-time agent deliberations, and interactive multi-model evaluations without interface freezing.',
    },
    {
      id: 1,
      tag: 'TIER 02 // THE MESSY MIDDLE',
      title: 'Dickson\'s Core Orchestration Engine',
      tech: 'FastAPI · Async Queues · FAISS Vector DB · Multi-Agent AIRA',
      latency: '< 85ms',
      description:
        'The critical bridge between isolated models and users: orchestrating prompt routing, semantic caching, vector retrieval with FAISS, and multi-agent consensus for reliable production throughput.',
    },
    {
      id: 2,
      tag: 'TIER 03',
      title: 'Inference & Resilience Guardrails',
      tech: 'LLMs · Fallback Routers · Docker · Automated Telemetry',
      latency: '< 210ms',
      description:
        'Production hardening: fallback models to mitigate rate limits, structured JSON schema validation, cost-optimized routing across 30+ models, and self-healing error recovery.',
    },
  ]

  return (
    <section
      id="about"
      aria-label="About Dickson E"
      className="relative min-h-screen w-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-400 pl-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden select-none"
    >
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hamish-style Section Eyebrow Tag */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[var(--accent)] font-medium">
              02 // DETAILS
            </span>
            <div className="w-12 h-[1px] bg-[var(--accent)]" />
          </div>
          <span className="font-katakana text-xs text-[var(--textLight)] tracking-widest opacity-60">
            プロフィール
          </span>
        </div>

        {/* Main Two-Column Grid matching Hamish Williams' layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN: THE NARRATIVE MANIFESTO ================= */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Lead Headline with Decoder */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--textTitle)] leading-[1.18] mb-6"
            >
              <span className="text-[var(--accent)] font-mono text-base block mb-2 font-normal tracking-wide">
                &lt;thesis&gt;
              </span>
              I don’t just use AI; <br />
              <span className="text-[var(--accent)]">
                I build the infrastructure
              </span>{' '}
              that makes it useful.
            </motion.h2>

            {/* Paragraph 1: The Core Philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base sm:text-lg text-[var(--textBody)] leading-relaxed mb-5 font-normal"
            >
              As an AI & Data Science engineer, I specialize in the{' '}
              <strong className="text-[var(--textTitle)] font-medium underline decoration-[var(--accent)]/40 underline-offset-4">
                messy, exciting middle ground
              </strong>{' '}
              where machine learning meets software engineering. While others train models in isolated notebooks, I build the full-stack pipelines—FastAPI backends, React frontends, and vector databases—that actually put AI into users' hands.
            </motion.p>

            {/* Paragraph 2: Production Focus */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--textBody)] leading-relaxed mb-8 font-normal"
            >
              From orchestrating multi-agent decision systems to building RAG-powered learning assistants, my focus is entirely on shipping production-ready intelligence. I’m driven by a simple goal:{' '}
              <span className="text-[var(--textTitle)] font-medium">
                turning complex data into systems that solve real-world problems.
              </span>
            </motion.p>

            {/* Three Architectural Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full space-y-3 mb-10"
            >
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm flex items-start gap-3.5 hover:border-[var(--accent)]/50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--textTitle)] mb-1 flex items-center gap-2">
                    <span>Beyond The Notebook Sandbox</span>
                    <span className="text-[10px] font-mono text-[var(--accent)] uppercase px-1.5 py-0.5 rounded bg-[var(--accent)]/10">
                      Production
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--textLight)] leading-relaxed">
                    Notebooks explore ideas; production microservices execute them. I construct low-latency API contracts, concurrency handlers, and dockerized microservices that keep models online.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm flex items-start gap-3.5 hover:border-[var(--accent)]/50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Workflow className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--textTitle)] mb-1 flex items-center gap-2">
                    <span>Multi-Agent System Orchestration</span>
                    <span className="text-[10px] font-mono text-[var(--accent)] uppercase px-1.5 py-0.5 rounded bg-[var(--accent)]/10">
                      AIRA Core
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--textLight)] leading-relaxed">
                    Moving past single prompts to structured multi-agent loops—where specialized autonomous agents collaborate, debate, verify facts, and produce explainable conclusions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm flex items-start gap-3.5 hover:border-[var(--accent)]/50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--textTitle)] mb-1 flex items-center gap-2">
                    <span>Vector Grounding & RAG Retrieval</span>
                    <span className="text-[10px] font-mono text-[var(--accent)] uppercase px-1.5 py-0.5 rounded bg-[var(--accent)]/10">
                      EduRAG
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--textLight)] leading-relaxed">
                    Preventing hallucinations through FAISS dense vector search, dynamic chunk indexing, and context-injected retrieval pipelines that cite ground truth.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-glow)] hover:brightness-110"
              >
                <span>Send me a message</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#projects"
                className="text-xs font-mono tracking-wider text-[var(--textLight)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 py-2 px-3"
              >
                <span>See architecture in action</span>
                <span className="text-[var(--accent)]">→</span>
              </a>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE HUD / ARCHITECTURE MATRIX ================= */}
          <div className="lg:col-span-6 relative">
            {/* Signature Hamish Katakana Vertical Watermark Accent */}
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-12 bottom-0 hidden xl:flex flex-col items-center justify-around pointer-events-none opacity-10 select-none text-2xl font-katakana text-[var(--accent)]"
            >
              <span>イ</span>
              <span>ン</span>
              <span>フ</span>
              <span>ラ</span>
              <span>ス</span>
              <span>ト</span>
              <span>ラ</span>
              <span>ク</span>
              <span>チ</span>
              <span>ャ</span>
            </div>

            {/* Interactive Terminal / System HUD Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
            >
              {/* Terminal Window Header */}
              <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-[var(--textLight)]">
                    dickson_sys_hud.sh
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full border border-[var(--accent)]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>SYS_STATUS: OPTIMAL</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[var(--bg)] border border-[var(--border-subtle)] mb-6 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    activeTab === 'pipeline'
                      ? 'bg-[var(--accent)] text-black font-semibold shadow'
                      : 'text-[var(--textLight)] hover:text-[var(--textTitle)]'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Stack</span> Pipeline
                </button>

                <button
                  onClick={() => setActiveTab('contrast')}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    activeTab === 'contrast'
                      ? 'bg-[var(--accent)] text-black font-semibold shadow'
                      : 'text-[var(--textLight)] hover:text-[var(--textTitle)]'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Notebook vs Prod</span>
                </button>

                <button
                  onClick={() => setActiveTab('credentials')}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    activeTab === 'credentials'
                      ? 'bg-[var(--accent)] text-black font-semibold shadow'
                      : 'text-[var(--textLight)] hover:text-[var(--textTitle)]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Vitals</span>
                </button>
              </div>

              {/* TAB 1: INTERACTIVE 3-TIER PRODUCTION PIPELINE */}
              {activeTab === 'pipeline' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--textLight)] mb-1">
                    <span>INTERACTIVE PIPELINE RUNTIME</span>
                    <span className="text-[var(--accent)]">CLICK TIER TO INSPECT</span>
                  </div>

                  <div className="space-y-3">
                    {pipelineTiers.map((tier) => {
                      const isSelected = activePipelineTier === tier.id
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setActivePipelineTier(tier.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg shadow-[var(--accent-glow)]/10'
                              : 'border-[var(--border)] bg-[var(--bg)]/60 hover:border-[var(--accent)]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--accent)] font-semibold">
                                {tier.tag}
                              </span>
                              <h4 className="text-sm font-semibold text-[var(--textTitle)]">
                                {tier.title}
                              </h4>
                            </div>
                            <span className="font-mono text-[11px] text-[var(--textLight)]">
                              {tier.latency}
                            </span>
                          </div>

                          <div className="font-mono text-xs text-[var(--accent)] mb-2">
                            {tier.tech}
                          </div>

                          <p className="text-xs text-[var(--textBody)] leading-relaxed">
                            {tier.description}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg)]/40 flex items-center justify-between font-mono text-xs text-[var(--textLight)]">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>End-to-End Latency:</span>
                    </span>
                    <span className="text-[var(--accent)] font-semibold">~130ms avg token TTFT</span>
                  </div>
                </div>
              )}

              {/* TAB 2: NOTEBOOK VS PRODUCTION CONTRAST */}
              {activeTab === 'contrast' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-red-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        THE ISOLATED NOTEBOOK (.ipynb)
                      </span>
                      <span className="font-mono text-[10px] text-red-400/80">
                        Zero Users
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--textLight)]">
                      <li className="flex items-center gap-2">
                        <span className="text-red-400">×</span> Hardcoded paths & local GPU dependencies
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-400">×</span> Memory leaks on repeated inferences
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-400">×</span> No streaming, authentication, or retry logic
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[var(--accent)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                        DICKSON'S PRODUCTION PIPELINE
                      </span>
                      <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                        User Ready
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--textTitle)]">
                      <li className="flex items-center gap-2">
                        <span className="text-[var(--accent)] font-bold">✓</span> Async FastAPI microservices with connection pooling
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[var(--accent)] font-bold">✓</span> Real-time FAISS vector retrieval & semantic indexing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[var(--accent)] font-bold">✓</span> Resilient multi-agent deliberation & fallback routing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[var(--accent)] font-bold">✓</span> Dockerized CI/CD deployed with low latency
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--textLight)] flex items-center justify-between">
                    <span>Outcome:</span>
                    <span className="text-[var(--textTitle)] font-semibold">
                      Real software solving real problems.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFIED CREDENTIALS & ACADEMIC VITALS */}
              {activeTab === 'credentials' && (
                <div className="space-y-4">
                  {/* Academic Rigor */}
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/80">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--textTitle)]">
                            B.Tech in Artificial Intelligence & Data Science
                          </h4>
                          <p className="text-xs text-[var(--textLight)]">
                            Karunya Institute of Technology and Sciences · 2023–2027
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded border border-[var(--accent)]/20">
                        CGPA 8.52 / 10
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--textLight)]">
                      <span>Montfort Matric Higher Secondary (Class XII):</span>
                      <span className="text-[var(--textTitle)] font-semibold">90.50%</span>
                    </div>
                  </div>

                  {/* Industry Certifications */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase mb-1">
                      Verified Industry Credentials
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {certifications.map((cert) => (
                        <div
                          key={cert.title}
                          className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 hover:border-[var(--accent)]/40 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                              {cert.issuer}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--textLight)]">
                              {cert.year}
                            </span>
                          </div>
                          <h5 className="text-xs font-medium text-[var(--textTitle)] leading-snug">
                            {cert.title}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Console Status Bar */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--textLight)] gap-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>TRICHY_NODE · [10.7905° N, 78.7047° E]</span>
                </span>
                <span>PRODUCTION_INTELLIGENCE // ACTIVE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
