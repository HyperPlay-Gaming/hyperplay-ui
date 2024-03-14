import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'

import cn from 'classnames'

import { ArrowTop, DownArrow } from '@/assets/images'

import styles from './Collapse.module.scss'

export interface CollapseProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
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

const Collapse = ({ title, classNames, children, ...props }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen((prev) => !prev)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div
      className={cn(
        styles.root,
        classNames?.root,
        isOpen ? classNames?.open : classNames?.closed
      )}
    >
      <button
        {...props}
        className={styles.toggleButton}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <span className={cn('title', styles.buttonTitle, classNames?.title)}>
          {title}
        </span>
        {isOpen ? (
          <ArrowTop className={styles.arrowTopIcon} />
        ) : (
          <DownArrow className={styles.arrowDownIcon} />
        )}
      </button>
      {isOpen ? (
        <div className={cn(styles.content, classNames?.content)}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default Collapse
