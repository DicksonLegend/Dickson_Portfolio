import React, { useEffect, useState, useRef } from 'react'

const KATAKANA_GLYPHS = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  '0', '1', 'X', 'Z',
]

export interface DecoderTextProps {
  text: string
  className?: string
  startDelay?: number
  speed?: number
  showBlockMask?: boolean
}

export const DecoderText: React.FC<DecoderTextProps> = ({
  text,
  className = '',
  startDelay = 0,
  speed = 40,
  showBlockMask = false,
}) => {
  const [displayText, setDisplayText] = useState<string>(text)
  const [isWiping, setIsWiping] = useState(false)
  const animFrameId = useRef<number | null>(null)
  const timeoutId = useRef<number | null>(null)

  useEffect(() => {
    let startTime: number | null = null
    const targetLength = text.length
    const durationPerChar = speed
    const totalDuration = targetLength * durationPerChar + 300

    if (showBlockMask) {
      const startWipe = window.setTimeout(() => setIsWiping(true), 0)
      const endWipe = window.setTimeout(() => setIsWiping(false), 550)
      return () => {
        clearTimeout(startWipe)
        clearTimeout(endWipe)
      }
    }

    const startDecoding = () => {
      const updateFrame = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / totalDuration, 1)

        // Number of characters resolved
        const resolvedCount = Math.floor(progress * targetLength)

        let result = ''
        for (let i = 0; i < targetLength; i++) {
          if (text[i] === ' ') {
            result += ' '
          } else if (i < resolvedCount) {
            result += text[i]
          } else {
            const randomGlyph =
              KATAKANA_GLYPHS[Math.floor(Math.random() * KATAKANA_GLYPHS.length)]
            result += randomGlyph
          }
        }

        setDisplayText(result)

        if (progress < 1) {
          animFrameId.current = requestAnimationFrame(updateFrame)
        } else {
          setDisplayText(text)
        }
      }

      animFrameId.current = requestAnimationFrame(updateFrame)
    }

    if (startDelay > 0) {
      timeoutId.current = window.setTimeout(startDecoding, startDelay)
    } else {
      startDecoding()
    }

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [text, startDelay, speed, showBlockMask])

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Cyan block mask wipe overlay */}
      {showBlockMask && isWiping && (
        <span
          className="absolute inset-y-0 left-0 bg-[#00e5ff] z-10 pointer-events-none animate-blockWipe"
          style={{
            animation: 'cyanBlockWipe 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards',
          }}
        />
      )}
      <span className="relative z-0 font-mono tracking-wider">{displayText}</span>
    </span>
  )
}
