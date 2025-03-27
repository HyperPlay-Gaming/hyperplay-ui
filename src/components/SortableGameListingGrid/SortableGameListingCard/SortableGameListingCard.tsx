import React, { useEffect } from 'react'

import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'
import classNames from 'classnames'

import { GameListingCard } from '@/components/GameListingCard'

import styles from './SortableGameListingCard.module.scss'

export type RenderItemProps = {
  onRemove: ItemProps['onRemove']
  dragOverlay: boolean
  dragging: boolean
  sorting: boolean
  index: number | undefined
  fadeIn: boolean
  listeners: DraggableSyntheticListeners
  ref: React.Ref<HTMLElement>
  style: React.CSSProperties | undefined
  transform: ItemProps['transform']
  transition: ItemProps['transition']
  value: ItemProps['value']
}

export type RenderItemFunction = (args: RenderItemProps) => React.ReactElement
export interface ItemProps {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  value: UniqueIdentifier
  onRemove?(): void
  renderItem: RenderItemFunction
}

type SortableGameListingCardProps = Omit<ItemProps, 'renderItem'> & {
  getItemProps: (id: UniqueIdentifier) => {
    title: string
    image: string
  }
}

export const SortableGameListingCard = React.memo(
  React.forwardRef<HTMLLIElement, SortableGameListingCardProps>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        index,
        listeners,
        onRemove,
        sorting,
        style,
        transition,
        transform,
        wrapperStyle,
        getItemProps,
        value,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      const isDragging = dragging || dragOverlay

      const { title, image } = getItemProps(value)

      return (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...props}
            tabIndex={0}
          >
            <GameListingCard
              listeners={listeners}
              title={title}
              image={image}
              action={isDragging ? 'none' : 'remove'}
              onAction={() => {
                if (isDragging) return
                onRemove?.()
              }}
            />
          </div>
        </li>
      )
    }
  )
)
