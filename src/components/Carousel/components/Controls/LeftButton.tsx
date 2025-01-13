import { ChevronLeft } from '@/assets/images'

import BaseButton, { BaseButtonProps } from './BaseButton'
import styles from './LeftButton.module.css'

const LeftButton = ({ onClick }: BaseButtonProps) => (
  <div className={styles.button}>
    <BaseButton onClick={onClick}>
      <ChevronLeft />
    </BaseButton>
  </div>
)

export default LeftButton
