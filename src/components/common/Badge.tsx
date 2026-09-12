import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'indigo' | 'violet' | 'emerald' | 'slate'
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'cyan',
  children,
  ...props
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-white/10',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
