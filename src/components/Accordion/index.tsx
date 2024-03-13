import React, { useState } from 'react'

import cn from 'classnames'

import { DownArrow } from '@/assets/images'

import styles from './Accordion.module.scss'

export interface AccordionProps {
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

const Accordion = ({ title, classNames, children }: AccordionProps) => {
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

export default Accordion
