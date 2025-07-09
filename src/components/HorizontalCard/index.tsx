import React from 'react'

import styles from './HorizontalCard.module.scss'

import fallbackImage from '@/assets/fallback_card.jpg?url'

import classNames from 'classnames'

export interface HorizontalCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  gameImage?: React.JSX.Element
  imageUrl?: string
  children?: React.ReactNode
  title: string
  orderNumber?: string
  onCardClick: React.MouseEventHandler<HTMLDivElement>
  tone?: 'brand' | 'neutral'
  size?: 'large' | 'small'
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  gameImage,
  title,
  children,
  orderNumber,
  onCardClick,
  tone = 'neutral',
  size = 'large',
  ...props
}) => {
  const image = gameImage || <img src={fallbackImage} alt="Game Image" />

  return (
    <>
      <div
        className={classNames(
          styles.horizontalCard,
          styles[tone],
          styles[size]
        )}
        onClick={onCardClick}
        {...props}
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
      </div>
    </>
  )
}

export default HorizontalCard
