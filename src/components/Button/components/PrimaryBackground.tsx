import React, { useRef, useState } from 'react'
import { useEvent } from 'react-use'

import { motion } from 'framer-motion'

import useCSSVariable from '@/utils/useCSSVariable'

const ANIM_DURATION = 0.25
const ANIM_DURATION_MS = ANIM_DURATION * 1000

interface PrimaryBackgroundProps {
  width: number
  height: number
  buttonElement: HTMLButtonElement | null
}

const PrimaryBackground = ({
  width,
  height,
  buttonElement
}: PrimaryBackgroundProps) => {
  const randomId = Math.random().toString(36).substring(7)
  const pressedTime = useRef<null | number>()

  const settings = {
    default: {
      primary: useCSSVariable('--ui-color-gradient-primary'),
      secondary: useCSSVariable('--ui-color-gradient-secondary'),
      primaryOffset: useCSSVariable('--ui-color-gradient-primary-offset'),
      secondaryOffset: useCSSVariable('--ui-color-gradient-secondary-offset'),
      rotation: useCSSVariable('--ui-color-gradient-rotation')
    },
    hover: {
      primary: useCSSVariable('--ui-color-gradient-hover-primary'),
      secondary: useCSSVariable('--ui-color-gradient-hover-secondary'),
      primaryOffset: useCSSVariable('--ui-color-gradient-hover-primary-offset'),
      secondaryOffset: useCSSVariable(
        '--ui-color-gradient-hover-secondary-offset'
      ),
      rotation: useCSSVariable('--ui-color-gradient-hover-rotation')
    },
    active: {
      primary: useCSSVariable('--ui-color-gradient-active-primary'),
      secondary: useCSSVariable('--ui-color-gradient-active-secondary'),
      primaryOffset: useCSSVariable(
        '--ui-color-gradient-active-primary-offset'
      ),
      secondaryOffset: useCSSVariable(
        '--ui-color-gradient-active-secondary-offset'
      ),
      rotation: useCSSVariable('--ui-color-gradient-active-rotation')
    }
  }

  const [state, setState] = useState<keyof typeof settings>('default')

  // modify the useEvents to use useEffect
  useEvent('mouseenter', () => setState('hover'), buttonElement)
  useEvent('mouseleave', () => setState('default'), buttonElement)
  useEvent(
    'mousedown',
    () => {
      setState('active')
      pressedTime.current = Date.now()
    },
    buttonElement
  )
  useEvent(
    'mouseup',
    () => {
      if (Date.now() - pressedTime.current! < ANIM_DURATION_MS) {
        // persist animation if mouseup is too fast
        setTimeout(() => {
          setState('hover')
        }, pressedTime.current! + ANIM_DURATION_MS - Date.now())
      } else {
        // full animation has been played, return to normal
        setState('hover')
      }
    },
    buttonElement
  )

  const currentSettings = settings[state]

  return (
    <motion.svg
      viewBox={`0 0 ${Math.round(width)} ${Math.round(height)}`}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      width={width}
      height={height}
    >
      <motion.linearGradient
        id={randomId}
        animate={{
          gradientTransform: `rotate(${currentSettings.rotation}, 0.5, 0.5)`
        }}
        transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
      >
        <motion.stop
          animate={{
            stopColor: currentSettings.primary,
            offset: currentSettings.primaryOffset
          }}
          transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
        />
        <motion.stop
          animate={{
            stopColor: currentSettings.secondary,
            offset: currentSettings.secondaryOffset
          }}
          transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
        />
      </motion.linearGradient>

      <motion.rect width={width} height={height} fill={`url(#${randomId})`} />
    </motion.svg>
  )
}

export default PrimaryBackground
