import styles from './LeftButton.module.css'
import { ChevronLeft } from '../../../../assets/images'
import React from 'react'
import BaseButton, { BaseButtonProps } from './BaseButton'

const LeftButton = ({ onClick }: BaseButtonProps) => (
  <div className={styles.button}>
    <BaseButton onClick={onClick}>
      <ChevronLeft />
    </BaseButton>
  </div>
)

export default LeftButton
