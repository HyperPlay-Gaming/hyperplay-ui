import React from 'react'

import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'

import Sticker, { StickerProps } from '../Sticker'
import styles from './MetaSection.module.scss'

interface ClassNames {
  root?: string
  title?: string
  stickersContainer?: string
  dropdown?: string
  popover?: string
  hiddenItemsList?: string
}

interface StickerOptions {
  dimension?: StickerProps['dimension']
  styleType?: StickerProps['styleType']
  variant?: StickerProps['variant']
  className?: string
}

export interface MetaSectionProps {
  title: string
  items: string[]
  classNames?: ClassNames
  stickerProps?: StickerOptions
  hiddenStickerProps?: StickerOptions
}

const MetaSection: React.FC<MetaSectionProps> = ({
  title,
  items,
  classNames: customClassNames,
  stickerProps = {},
  hiddenStickerProps = {}
}) => {
  const maxVisibleItems = 5
  const visibleItems = items.slice(0, maxVisibleItems)
  const hiddenItems =
    items.length > maxVisibleItems ? items.slice(maxVisibleItems) : []
  const [showPopover, { open, close }] = useDisclosure(false)

  // Default sticker props
  const defaultStickerProps: StickerOptions = {
    styleType: 'secondary',
    variant: 'outlined',
    dimension: 'default'
  }

  // Default hidden sticker props
  const defaultHiddenStickerProps: StickerOptions = {
    styleType: 'secondary',
    variant: 'outlined',
    dimension: 'small'
  }

  // Merge default props with custom props
  const visibleStickerProps = { ...defaultStickerProps, ...stickerProps }
  const popoverStickerProps = {
    ...defaultHiddenStickerProps,
    ...hiddenStickerProps
  }

  return (
    <div className={classNames(styles.metaSection, customClassNames?.root)}>
      <h6 className={classNames(styles.title, customClassNames?.title)}>
        {title}
      </h6>
      <div
        className={classNames(
          styles.stickersContainer,
          customClassNames?.stickersContainer
        )}
      >
        {visibleItems.map((item, index) => (
          <Sticker
            key={index}
            styleType={visibleStickerProps.styleType}
            variant={visibleStickerProps.variant}
            dimension={visibleStickerProps.dimension}
            className={visibleStickerProps.className}
          >
            {item}
          </Sticker>
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
              <div onMouseEnter={open} onMouseLeave={close}>
                <Sticker
                  styleType={visibleStickerProps.styleType}
                  variant={visibleStickerProps.variant}
                  dimension={visibleStickerProps.dimension}
                  className={visibleStickerProps.className}
                >
                  +{hiddenItems.length}
                </Sticker>
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
                  <Sticker
                    key={index}
                    styleType={popoverStickerProps.styleType}
                    variant={popoverStickerProps.variant}
                    dimension={popoverStickerProps.dimension}
                    className={popoverStickerProps.className}
                  >
                    {item}
                  </Sticker>
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
