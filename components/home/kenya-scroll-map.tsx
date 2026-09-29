'use client'

import { useEffect, useState } from 'react'

const countyLines = [
  'M 205 82 L 248 126 L 238 174 L 266 218 L 247 268 L 278 314',
  'M 248 126 L 310 112 L 354 145 L 341 194 L 375 232 L 350 282',
  'M 238 174 L 198 208 L 188 258 L 216 300 L 205 348',
  'M 266 218 L 304 238 L 300 292 L 326 335 L 315 382',
  'M 216 300 L 263 314 L 278 360 L 262 408',
  'M 278 314 L 350 282 L 398 304 L 422 350 L 410 402',
  'M 315 382 L 362 370 L 410 402 L 396 456',
  'M 262 408 L 302 438 L 348 445 L 396 456',
  'M 350 282 L 370 248 L 414 258 L 444 300',
]

export function KenyaScrollMap() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      if (reduceMotion.matches) {
        setProgress(1)
        return
      }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 1)
    }
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const outlineOffset = 1 - Math.min(1, progress * 1.7)
  const divisionsProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.72))

  return (
    <div className="kenya-map-backdrop" aria-hidden="true">
      <svg viewBox="150 40 330 455" role="presentation">
        <title>Decorative line drawing of Kenya</title>
        {/* Replace these simplified paths with official county boundary SVG data when available. */}
        <path
          className="kenya-map-outline"
          pathLength="1"
          d="M 205 82 L 250 52 L 302 72 L 340 58 L 385 92 L 414 142 L 454 178 L 438 226 L 470 270 L 444 300 L 422 350 L 410 402 L 396 456 L 348 445 L 302 438 L 262 408 L 205 348 L 216 300 L 188 258 L 198 208 L 238 174 L 205 82 Z"
          style={{ strokeDashoffset: outlineOffset }}
        />
        <g className="kenya-map-divisions" style={{ opacity: divisionsProgress }}>
          {countyLines.map((line) => (
            <path key={line} pathLength="1" d={line} />
          ))}
        </g>
      </svg>
    </div>
  )
}
