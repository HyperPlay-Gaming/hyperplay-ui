import React, { useState } from 'react'

import cn from 'classnames'

import { DownArrow } from '@/assets/images'

import styles from './Collapse.module.scss'

export interface CollapseProps {
  title: string
  children: React.ReactNode
  classNames?: {
    root?: string
    content?: string
    title?: string
    open?: string
    closed?: string
  }
}

const Collapse = ({ title, classNames, children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn(
        styles.root,
        classNames?.root,
        isOpen ? classNames?.open : classNames?.closed
      )}
    >
      <div
        className={styles.toggleButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={cn('title', styles.buttonTitle, classNames?.title)}>
          {title}
        </span>
        <DownArrow fill="var(--color-neutral-400)" />
      </div>
      {isOpen ? (
        <div className={cn(styles.content, classNames?.content)}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default Collapse
