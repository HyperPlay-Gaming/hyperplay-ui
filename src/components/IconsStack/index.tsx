import React, { useState } from 'react'
import { Popover, Tooltip } from '@mantine/core'
import cx from 'classnames'

import styles from './IconsStack.module.scss'

export interface IconItem {
  title: string
  icon: React.ReactNode
}

export interface IconsStackClassNames {
  root?: string
  iconsContainer?: string
  popover?: string
  popoverDropdown?: string
}

export interface IconsStackProps {
  title?: string
  icons: IconItem[]
  maxVisible?: number
  showMore?: boolean
  forceShowMore?: boolean
  classNames?: IconsStackClassNames
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
  classNames,
  i18n = { more: 'More' },
  ...props
}: IconsStackProps) => {
  const [hovered, setHovered] = useState(false)
  const visibleIcons = icons.slice(0, maxVisible)
  const remaining = icons.slice(maxVisible)
  const hasMore = remaining.length > 0

  const shouldShowMore = forceShowMore || (hasMore && showMore)

  return (
    <div className={cx(styles.iconsStack, classNames?.root)} {...props}>
      {title ? <span className={styles.title}>{title}</span> : null}
      <div className={cx(styles.iconsContainer, classNames?.iconsContainer)}>
        {visibleIcons.map((iconItem, index) => (
          <Tooltip
            key={`icon-${index}`}
            label={iconItem.title}
            className={styles.tooltip}
            events={{ hover: true, touch: true, focus: false }}
          >
            <div className={styles.icon}>{iconItem.icon}</div>
          </Tooltip>
        ))}
        {shouldShowMore && (
          <Popover
            opened={hovered}
            position="top"
            withArrow
            classNames={{
              dropdown: cx(styles.popover, classNames?.popover),
              arrow: styles.popoverArrow
            }}
          >
            <Popover.Target>
              <div
                className={styles.more}
                data-testid="icons-more-button"
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
                  {remaining.map((iconItem, index) => (
                    <div
                      key={`remaining-${index}`}
                      className={cx(
                        styles.popoverItem,
                        classNames?.popoverDropdown
                      )}
                    >
                      <div className={styles.popoverIcon}>{iconItem.icon}</div>
                      <span className={styles.popoverIconName}>
                        {iconItem.title}
                      </span>
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
