import React, { ReactNode } from 'react'

import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import cx from 'classnames'

import styles from './MetaSection.module.scss'

interface ClassNames {
  root?: string
  title?: string
  itemsContainer?: string
  popover?: string
  hiddenItemsList?: string
  moreIndicator?: string
}

export interface MetaSectionProps {
  title: string
  items: ReactNode[]
  classNames?: ClassNames
  maxVisibleItems?: number
  moreIndicator?: ReactNode
}

const MetaSection: React.FC<MetaSectionProps> = ({
  title,
  items,
  classNames,
  maxVisibleItems = 5,
  moreIndicator
}) => {
  const visibleItems = items.slice(0, maxVisibleItems)
  const hiddenItems =
    items.length > maxVisibleItems ? items.slice(maxVisibleItems) : []
  const [showPopover, { open, close }] = useDisclosure(false)

  // Create the +N indicator based on the first visible item style
  const renderMoreIndicator = () => {
    if (moreIndicator) {
      return moreIndicator
    }

    return (
      <div className={cx(styles.moreIndicator, classNames?.moreIndicator)}>
        +{hiddenItems.length}
      </div>
    )
  }

  return (
    <div className={cx(styles.metaSection, classNames?.root)}>
      <h3 className={cx(styles.title, classNames?.title)}>{title}</h3>
      <div className={cx(styles.itemsContainer, classNames?.itemsContainer)}>
        {visibleItems.map((item, index) => (
          <div key={index} className={styles.item}>
            {item}
          </div>
        ))}
        {hiddenItems.length > 0 && (
          <Popover
            position="bottom"
            shadow="md"
            opened={showPopover}
            classNames={{
              dropdown: cx(styles.popover, classNames?.popover)
            }}
          >
            <Popover.Target>
              <div
                onMouseEnter={open}
                onMouseLeave={close}
                className={styles.item}
              >
                {renderMoreIndicator()}
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <div
                className={cx(
                  styles.hiddenItemsList,
                  classNames?.hiddenItemsList
                )}
              >
                {hiddenItems.map((item, index) => (
                  <div key={index} className={styles.hiddenItem}>
                    {item}
                  </div>
                ))}
              </div>
            </Popover.Dropdown>
          </Popover>
        )}
      </div>
    </div>
  )
}

export default MetaSection
