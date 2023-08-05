import React, { PropsWithChildren } from 'react'

import styles from './BaseButton.module.css'

export interface BaseButtonProps {
  onClick: () => void
}

const BaseButton = ({
  children,
  onClick
}: PropsWithChildren<BaseButtonProps>) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default BaseButton
