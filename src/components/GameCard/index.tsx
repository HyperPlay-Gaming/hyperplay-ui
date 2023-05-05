import React from 'react'

import FallbackImage from '@/assets/fallback_card.jpg?url'

import * as Images from '../../assets/images'
import styles from './GameCard.module.scss'
import imageStyles from './components/Image/Image.module.css'

type GameCardProps = {
  image?: JSX.Element
  imageUrl?: string
  title: string
  onFavoriteClick?: () => void
  onDownloadClicked?: () => void
}

const GameCard = ({
  image,
  imageUrl,
  title,
  onFavoriteClick,
  onDownloadClicked
}: GameCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.border} />
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={imageStyles.proportions}>
            {image || imageUrl ? (
              <img src={imageUrl} />
            ) : (
              <img
                src={FallbackImage}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className={styles.bottomContainer}>
            <div className={`${styles.title} title`}>{title}</div>
            <div className={styles.actionButtonContainer}>
              <button style={{ paddingLeft: '0px' }}>
                <Images.Ellipsis fill="var(--color-neutral-100)"></Images.Ellipsis>
              </button>
              <button onClick={onFavoriteClick}>
                <Images.Heart fill="var(--color-neutral-100)"></Images.Heart>
              </button>
              <div className={styles.endActionButtonContainer}>
                <button onClick={onDownloadClicked}>
                  <Images.DownloadIcon fill="var(--color-neutral-100)"></Images.DownloadIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
