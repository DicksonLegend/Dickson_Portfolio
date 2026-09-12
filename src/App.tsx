import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Terminal, Layers, Cpu, CheckCircle2, RotateCcw } from 'lucide-react'
import { Container, IntroLoader } from './components/layout'
import { Card, Button } from './components/common'
import { personalInfo } from './data/portfolioData'

export function App() {
  const [showIntro, setShowIntro] = useState(true)

  const stackItems = [
    { label: 'Vite + React 19', icon: Layers, status: 'Active' },
    { label: 'Tailwind CSS v4', icon: Sparkles, status: 'Configured' },
    { label: 'Framer Motion', icon: Cpu, status: 'Configured' },
    { label: '3D Spiral Particle System', icon: Sparkles, status: 'Active (GSAP)' },
    { label: 'Folder Architecture', icon: Terminal, status: 'Ready' },
  ]

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 3D Spiral Particle Loading Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroLoader
            onComplete={() => setShowIntro(false)}
            duration={9.5}
          />
        )}
      </AnimatePresence>

      {/* Main Portfolio Foundation */}
      <AnimatePresence>
        {!showIntro && (
          <motion.main
            key="main-portfolio-content"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen flex flex-col justify-center py-16"
          >
            {/* Subtle radial ambient glow */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-40 -z-10"
            >
              <div className="h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/10 blur-[120px]" />
            </div>

            <Container className="max-w-2xl text-center">
              <div className="space-y-6">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>TRANSITION SUCCESSFUL</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {personalInfo.name}
                  </h1>
                  <p className="text-sm font-mono text-cyan-400/90 tracking-wide uppercase">
                    {personalInfo.title}
                  </p>
                  <p className="text-slate-400 text-sm max-w-md mx-auto pt-2">
                    {personalInfo.headline}. Ready to build section by section with full Dark & Light mode integration.
                  </p>
                </div>

                {/* Setup verification card */}
                <Card className="text-left mt-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                      ENVIRONMENT & ANIMATIONS
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      LOADER & SYSTEM READY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stackItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-3.5 py-2.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4 text-cyan-400" />
                            <span className="text-xs font-medium text-slate-200">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {item.status}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Replay action */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Want to review the 3D spiral transition again?
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowIntro(true)}
                      className="text-xs gap-1.5 py-1.5 px-3"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Replay Spiral
                    </Button>
                  </div>
                </Card>
              </div>
            </Container>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
