import React from 'react'

import cn from 'classnames'

import { GreenStatus } from '@/assets/images'

import styles from './AuthProviderButton.module.scss'

export interface AuthProviderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  name: string
  icon?: React.ReactNode
  label?: React.ReactNode
  connected?: boolean
}

const AuthProviderButton = ({
  name,
  icon,
  connected,
  label,
  className,
  ...props
}: AuthProviderButtonProps) => {
  return (
    <button className={cn(styles.box, className)} {...props} aria-label={name}>
      {connected && <GreenStatus className={styles.connectedIcon} />}
      {icon}
      <span className={cn('caption', styles.name)}>{name}</span>
      {label}
    </button>
  )
}

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <span className={cn(styles.label, className)} {...props}>
      {children}
    </span>
  )
}

AuthProviderButton.Label = Label

export default AuthProviderButton
