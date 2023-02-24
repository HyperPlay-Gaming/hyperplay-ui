import styles from './RightButton.module.css'
import { ChevronRight } from '../../../../assets/images'
import React from 'react'
import BaseButton, { BaseButtonProps } from './BaseButton'

const RightButton = ({ onClick }: BaseButtonProps) => (
  <div className={styles.button}>
    <BaseButton onClick={onClick}>
      <ChevronRight />
    </BaseButton>
  </div>
)

export default RightButton
