import React from 'react'

import classNames from 'classnames'

import fallbackImage from '@/assets/fallback_card.jpg?url'

import styles from './HorizontalCard.module.scss'

export interface HorizontalCardProps {
  gameImage?: React.JSX.Element
  imageUrl?: string
  children?: React.ReactNode
  title: string
  orderNumber?: string
  onCardClick?: React.MouseEventHandler<HTMLDivElement>
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
  tone?: 'brand' | 'neutral'
  size?: 'large' | 'small'
  noHover?: boolean
  cardComponent?: React.ElementType
  href?: string
  type?: string
  target?: string
  rel?: string
}

const HorizontalCard = React.forwardRef<HTMLDivElement, HorizontalCardProps>(
  (props, ref) => {
    const {
      cardComponent: CardComponent = 'div',
      gameImage,
      title,
      children,
      orderNumber,
      onCardClick,
      tone = 'neutral',
      size = 'large',
      noHover = false,
      ...rest
    } = props

    const image = gameImage || <img src={fallbackImage} alt="Game Image" />

    return (
      <CardComponent
        ref={ref}
        className={classNames(
          styles.horizontalCard,
          styles[tone],
          styles[size],
          {
            [styles.noHover]: noHover
          }
        )}
        onClick={onCardClick}
        {...rest}
      >
        <div className={styles.gameImage}>{image}</div>
        <div className={styles.content}>
          <div className={classNames(styles.title, 'title')}>{title}</div>
          {children ? <div className={styles.children}>{children}</div> : null}
        </div>
        {orderNumber ? (
          <div className={classNames(styles.orderNumber, 'h6')}>
            {orderNumber}
          </div>
        ) : null}
      </CardComponent>
    )
  }
)

HorizontalCard.displayName = 'HorizontalCard'

export default HorizontalCard
