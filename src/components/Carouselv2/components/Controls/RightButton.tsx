import React from 'react'

import { ChevronRight } from '@/assets/images'

import BaseButton, { BaseButtonProps } from './BaseButton'
import styles from './RightButton.module.css'

const RightButton = ({ onClick }: BaseButtonProps) => (
  <div className={styles.button}>
    <BaseButton onClick={onClick}>
      <ChevronRight />
    </BaseButton>
  </div>
)

export default RightButton
