import React from 'react'

import classNames from 'classnames'

import HorizontalCard, { HorizontalCardProps } from '../HorizontalCard'
import styles from './index.module.scss'

export interface HorizontalCardLinkProps
  extends Omit<HorizontalCardProps, 'onCardClick'> {
  /* eslint-disable-next-line */
  Link?: any
  /* eslint-disable-next-line */
  linkProps: any
  children?: React.ReactNode
}

export function HorizontalCardLink({
  Link,
  linkProps,
  children,
  ...horizontalCardProps
}: HorizontalCardLinkProps) {
  const LinkElement = Link || 'a'
  const { className, ...props } = linkProps

  const linkClassNames = classNames(styles.horizontalCardLink, className)

  return (
    <LinkElement className={linkClassNames} {...props}>
      <HorizontalCard {...horizontalCardProps} onCardClick={() => {}}>
        {children}
      </HorizontalCard>
    </LinkElement>
  )
}
