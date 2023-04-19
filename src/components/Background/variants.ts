import type { SVGAttributes, SVGProps } from 'react'

export type Variants = 'gradient1'

type Variant = {
  gradientTransform: SVGAttributes<SVGLinearGradientElement>['gradientTransform']
  gradientStops: SVGProps<SVGStopElement>[]
}

const variants: Record<Variants, Variant> = {
  gradient1: {
    gradientTransform: 'rotate(80, 0.5, 0.5)',
    gradientStops: [
      { offset: '15%', stopColor: '#4126E8' },
      { offset: '40%', stopColor: '#EA1ABA' },
      { offset: '70%', stopColor: '#10A6D6' }
    ]
  }
}

export default variants
