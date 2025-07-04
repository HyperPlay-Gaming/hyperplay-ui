import React from 'react'

import styles from './HorizontalCard.module.scss'

import classNames from 'classnames'

export interface HorizontalCardProps {
  gameImage?: React.JSX.Element
  imageUrl?: string
  badge?: React.ReactNode
  button?: React.ReactNode
  title: string
  orderNumber?: string
  onCardClick: React.MouseEventHandler<HTMLDivElement>
  tone?: 'brand' | 'neutral'
  size?: 'large' | 'small'
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  gameImage,
  title,
  badge,
  button,
  orderNumber,
  onCardClick,
  tone = 'neutral',
  size = 'large'
}) => {
  const image = gameImage || (
    <img src="/MoonBlastersCover.png" alt="Game Image" />
  )

  return (
    <>
      <div
        className={classNames(
          styles.horizontalCard,
          styles[tone],
          styles[size]
        )}
        onClick={onCardClick}
      >
        <div className={styles.gameImage}>{image}</div>
        <div className={styles.content}>
          <div className={classNames(styles.title, 'title')}>{title}</div>
          {badge && <div className={styles.badge}>{badge}</div>}
          {button && <div className={styles.button}>{button}</div>}
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
