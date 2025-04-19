'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}: {
  items: { href: string }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (scrollerRef.current) {
      const children = Array.from(scrollerRef.current.children)
      children.forEach((child) => {
        const clone = child.cloneNode(true)
        scrollerRef.current?.appendChild(clone)
      })
      setHasMounted(true)
    }

    if (containerRef.current) {
      const duration =
        speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'

      containerRef.current.style.setProperty(
        '--animation-duration',
        duration
      )
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex gap-10 w-max py-4 animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, i) => (
          <li key={i}>
            <Image
              src={item.href}
              alt={`client-${i}`}
              width={150}
              height={60}
              className="opacity-80 grayscale hover:grayscale-0 transition duration-300"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
