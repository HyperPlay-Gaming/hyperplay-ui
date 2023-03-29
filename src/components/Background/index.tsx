import React, { HTMLAttributes } from 'react'

import pattern from '@/assets/background/pattern.svg?url'

import './test.css'

// allow things like className & style to be passed to the component

export type BackgroundProps = HTMLAttributes<HTMLOrSVGElement>

export default function Background(props: BackgroundProps) {
  return (
    <svg width="100vw" height="100vh" {...props}>
      <defs>
        <pattern
          id="pattern"
          width="114"
          height="114"
          patternUnits="userSpaceOnUse"
        >
          <image href={pattern} x="-3.05" y="-3.1" width="122" height="122" />
        </pattern>

        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#gradient)"
        mask="url(#mask)"
      />

      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
        gradientTransform="rotate(80, 0.5, 0.5)"
      >
        {/* <stop offset="0%" stopColor="#282828" /> */}
        <stop stopColor="#4126E8" offset="15%" />
        <stop offset="40%" stopColor="#EA1ABA" />
        <stop offset="70%" stopColor="#10A6D6" />
        {/* <stop offset="100%" stopColor="#282828" /> */}
      </linearGradient>
    </svg>
  )
}
