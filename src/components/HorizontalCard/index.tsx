import React from 'react'

import styles from './HorizontalCard.module.scss'

import Button from '../Button'
import Sticker from '../Sticker'

export interface HorizontalCardProps {
  gameImage?: React.JSX.Element
  imageUrl?: string
  badge?: React.ReactNode
  button?: React.ReactNode
  title: string
  orderNumber?: string
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
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
  onButtonClick,
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
        className={[styles.horizontalCard, styles[tone], styles[size]].join(
          ' '
        )}
        onClick={onCardClick}
      >
        <div className={styles.gameImage}>{image}</div>
        <div className={styles.content}>
          <div className={['title', styles.title].join(' ')}>{title}</div>
          {badge ? (
            <div className={styles.badge}>
              <Sticker>{badge}</Sticker>
            </div>
          ) : null}
          {button ? (
            <div className={styles.button}>
              <Button type="secondary" size="small" onClick={onButtonClick}>
                {button}
              </Button>
            </div>
          ) : null}
        </div>
        {orderNumber ? (
          <div className={`h6 ${styles.orderNumber}`}>{orderNumber}</div>
        ) : null}
      </div>
    </>
  )
}

export default HorizontalCard
