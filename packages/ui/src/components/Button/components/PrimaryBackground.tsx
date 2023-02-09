import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useCSSVariable from '../../../../src/utils/useCSSVariable'
import { useEvent } from 'react-use'

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
  const primaryGradientColor = useCSSVariable('--color-gradient-primary')
  const secondaryGradientColor = useCSSVariable('--color-gradient-secondary')
  const defaultRotation = useCSSVariable('--color-gradient-default-rotation')
  const hoverRotation = useCSSVariable('--color-gradient-hover-rotation')
  const activeRotation = useCSSVariable('--color-gradient-active-rotation')
  const activePrimaryOffset = useCSSVariable(
    '--color-gradient-active-primary-offset'
  )
  const activeSecondaryOffset = useCSSVariable(
    '--color-gradient-active-secondary-offset'
  )

  const [rotation, setRotationState] = useState(defaultRotation)
  const setRotation = (rotation: string) => setRotationState(rotation)

  useEvent('mouseenter', () => setRotation(hoverRotation), buttonElement)
  useEvent('mouseleave', () => setRotation(defaultRotation), buttonElement)
  useEvent('mousedown', () => setRotation(activeRotation), buttonElement)
  useEvent('mouseup', () => setRotation(hoverRotation), buttonElement)

  const isActive = rotation === activeRotation

  return (
    <motion.svg
      viewBox={`0 0 ${Math.round(width)} ${Math.round(height)}`}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      width={width}
      height={height}
    >
      <motion.linearGradient
        id="test"
        animate={{
          gradientTransform: `rotate(${rotation}, 0.5, 0.5)`
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <motion.stop
          stopColor={primaryGradientColor}
          animate={{ offset: isActive ? activePrimaryOffset : '0%' }}
        />
        <motion.stop
          stopColor={secondaryGradientColor}
          animate={{ offset: isActive ? activeSecondaryOffset : '100%' }}
        />
      </motion.linearGradient>

      <motion.rect width={width} height={height} fill="url(#test)" />
    </motion.svg>
  )
}

export default PrimaryBackground
