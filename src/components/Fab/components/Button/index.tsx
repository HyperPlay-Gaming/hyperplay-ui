import React from 'react'

import CircularButton from '@/components/CircularButton'

import styles from './Button.module.scss'

export interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  label?: string
}

export default function Button(props: ButtonProps) {
  return (
    <div className={styles.container}>
      <div className="menu">{props.label}</div>
      <CircularButton className={styles.button} onClick={props.onClick}>
        {props.children}
      </CircularButton>
    </div>
  )
}
