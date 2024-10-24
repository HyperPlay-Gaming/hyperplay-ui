import React from 'react'

import { createPolymorphicComponent } from '@mantine/core'
import classNames from 'classnames'

import styles from './SubLink.module.scss'

export interface SubLinkProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  component?: any
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  children?: any
  className?: string
  selected?: boolean
}

function _SubLink({
  children,
  component,
  className,
  selected,
  ...props
}: SubLinkProps) {
  const linkClasses: Record<string, boolean> = {}
  linkClasses[styles.selected] = !!selected

  const Element = component || 'button'
  return (
    <Element
      className={classNames('caption-sm', styles.root, linkClasses, className)}
      {...props}
    >
      {children}
    </Element>
  )
}

export const SubLink = createPolymorphicComponent<'div', SubLinkProps>(_SubLink)
