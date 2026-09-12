import type { Variants, Transition } from 'framer-motion'

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: springTransition },
}
