import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  interactive?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, interactive = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -3 } : undefined}
        transition={{ duration: 0.2 }}
        className={cn(
          // Double-bezel outer shell
          'group relative rounded-2xl p-px bg-gradient-to-b from-white/10 to-white/5 shadow-xl transition-all duration-300',
          interactive && 'hover:from-cyan-500/30 hover:to-indigo-500/10 hover:shadow-cyan-500/10',
          className
        )}
        {...props}
      >
        {/* Inner container */}
        <div className="h-full w-full rounded-[calc(1rem-1px)] bg-[#0c101c]/90 p-6 backdrop-blur-xl transition-colors duration-300 group-hover:bg-[#0f1424]/90">
          {children}
        </div>
      </motion.div>
    )
  }
)

Card.displayName = 'Card'
