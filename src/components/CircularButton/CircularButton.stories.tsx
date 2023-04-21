import React from 'react'

import CircularButton from '.'
import { ArrowLeft, DownloadIcon } from '../../assets/images'

export default {
  title: 'CircularButton',
  component: CircularButton
}

export const Default = () => (
  <CircularButton>
    <ArrowLeft />
  </CircularButton>
)

export const DownloadIconButton = () => (
  <CircularButton
    style={{
      backgroundColor: 'var(--color-neutral-700)',
      padding: 'var(--space-xl)',
      border: '1px solid var(--color-stroke-01)'
    }}
  >
    <DownloadIcon fill="var(--color-success-400)" />
  </CircularButton>
)
