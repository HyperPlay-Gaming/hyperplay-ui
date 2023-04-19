import React, { HTMLAttributes } from 'react'

import pattern from '@/assets/background/pattern.svg?url'

import variants, { Variants } from './variants'

export type BackgroundProps = HTMLAttributes<HTMLOrSVGElement> & {
  variant?: Variants
}

export default function Background({
  variant = 'gradient1',
  ...props
}: BackgroundProps) {
  const { gradientTransform, gradientStops } = variants[variant]

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
        gradientTransform={gradientTransform}
      >
        {gradientStops.map((stopOptions) => (
          <>
            <stop {...stopOptions} />
          </>
        ))}
      </linearGradient>
    </svg>
  )
}
