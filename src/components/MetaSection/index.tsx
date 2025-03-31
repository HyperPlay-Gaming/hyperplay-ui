import React, { ReactNode } from 'react'

import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'

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
  classNames: customClassNames,
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
      <div
        className={classNames(
          styles.moreIndicator,
          customClassNames?.moreIndicator
        )}
      >
        +{hiddenItems.length}
      </div>
    )
  }

  return (
    <div className={classNames(styles.metaSection, customClassNames?.root)}>
      <h3 className={classNames(styles.title, customClassNames?.title)}>
        {title}
      </h3>
      <div
        className={classNames(
          styles.itemsContainer,
          customClassNames?.itemsContainer
        )}
      >
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
              dropdown: classNames(styles.popover, customClassNames?.popover)
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
                className={classNames(
                  styles.hiddenItemsList,
                  customClassNames?.hiddenItemsList
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
