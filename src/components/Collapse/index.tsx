import React, { HTMLAttributes, useEffect, useState } from 'react'

import cn from 'classnames'

import { ArrowTop, DownArrow } from '@/assets/images'

import styles from './Collapse.module.scss'

export interface CollapseClassNamesProp {
  root?: string
  content?: string
  title?: string
  subtitle?: string
  open?: string
  closed?: string
  toggleButton?: string
}

export interface CollapseProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onToggle'> {
  title: string
  subtitle?: string
  isOpen?: boolean
  onToggle?: (isNowOpen: boolean) => boolean | void
  children: React.ReactNode
  classNames?: CollapseClassNamesProp
}

const Collapse = ({
  title,
  subtitle,
  isOpen: externalIsOpen,
  onToggle,
  classNames,
  children,
  ...props
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen)
    }
  }, [externalIsOpen])

  const handleToggle = () => {
    const newState = externalIsOpen === undefined ? !isOpen : !externalIsOpen
    setIsOpen(newState)

    onToggle?.(newState)
  }

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen)
    }
  }, [externalIsOpen])

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
        className={cn(
          styles.toggleButton,
          classNames?.toggleButton,
          isOpen && styles.buttonOpen
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen || externalIsOpen}
      >
        <div className={styles.info}>
          <span className={cn('title', styles.buttonTitle, classNames?.title)}>
            {title}
          </span>
          {subtitle && (
            <span className={cn(styles.subtitle, classNames?.subtitle)}>
              {subtitle}
            </span>
          )}
        </div>
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
