import React, { useEffect } from 'react'

import classNames from 'classnames'

import { GameListingCard, GameListingCardProps } from '../GameListingCard'
import { ItemProps } from './Item'
import styles from './Item/Item.module.scss'

type SortableGameListingCardProps = ItemProps & GameListingCardProps

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
        title,
        image,
        action,
        onAction,
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
              action={isDragging ? 'none' : action}
              onAction={() => {
                if (isDragging) return
                if (action === 'remove') {
                  onRemove?.()
                } else {
                  onAction?.()
                }
              }}
            />
          </div>
        </li>
      )
    }
  )
)
