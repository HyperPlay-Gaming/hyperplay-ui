import React, { HTMLAttributes, useState } from 'react'
import { Popover } from '@mantine/core'
import classNames from 'classnames'

import styles from './IconsStack.module.scss'

export interface IconsStackProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  icons: React.ReactNode[]
  maxVisible?: number
  showMore?: boolean
  forceShowMore?: boolean
  className?: string
  i18n?: {
    more: string
  }
}

const IconsStack = ({
  title,
  icons,
  maxVisible = 7,
  showMore = true,
  forceShowMore = false,
  className,
  i18n = { more: 'More' },
  ...props
}: IconsStackProps) => {
  const [hovered, setHovered] = useState(false)
  const visibleIcons = icons.slice(0, maxVisible)
  const remaining = icons.slice(maxVisible)
  const hasMore = remaining.length > 0

  const shouldShowMore = forceShowMore || (hasMore && showMore)

  return (
    <div className={classNames(styles.iconsStack, className)} {...props}>
      {title ? <span className={styles.title}>{title}</span> : null}
      <div className={styles.iconsContainer}>
        {visibleIcons.map((icon, idx) => (
          <div key={idx} className={styles.icon}>
            {icon}
          </div>
        ))}
        {shouldShowMore && (
          <Popover
            opened={hovered}
            position="top"
            withArrow
            classNames={{
              dropdown: styles.popover,
              arrow: styles.popoverArrow
            }}
          >
            <Popover.Target>
              <div
                className={styles.more}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span
                  style={{
                    cursor: remaining.length ? 'pointer' : 'default'
                  }}
                  className={styles.moreText}
                >
                  +{i18n.more}
                </span>
              </div>
            </Popover.Target>
            {remaining.length ? (
              <Popover.Dropdown>
                <div className={styles.popoverContent}>
                  {remaining.map((icon, idx) => (
                    <div key={idx} className={styles.popoverItem}>
                      <div className={styles.popoverIcon}>{icon}</div>
                    </div>
                  ))}
                </div>
              </Popover.Dropdown>
            ) : null}
          </Popover>
        )}
      </div>
    </div>
  )
}

export default IconsStack
