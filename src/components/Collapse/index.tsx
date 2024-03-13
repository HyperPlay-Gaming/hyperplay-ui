import React, { useState } from 'react'

import cn from 'classnames'

import { ArrowTop, DownArrow } from '@/assets/images'

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
        {isOpen ? (
          <ArrowTop className={styles.arrowTopIcon} />
        ) : (
          <DownArrow className={styles.arrowDownIcon} />
        )}
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
