import React from 'react'

import styles from './GameCard.module.scss'
import Image from './components/Image'
import imageStyles from './components/Image/Image.module.css'

interface BaseGameCardProps {
  title: string
}

interface GameCardWithImageElement {
  image: JSX.Element
  imageUrl?: never
}

interface GameCardWithImageUrl {
  image?: never
  imageUrl: string
}

type GameCardProps = (GameCardWithImageElement | GameCardWithImageUrl) &
  BaseGameCardProps

const GameCard = ({ image, imageUrl, title }: GameCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.border} />
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={imageStyles.proportions}>
            {image || <Image src={imageUrl} />}
          </div>
          <h6 className={styles.title}>{title}</h6>
        </div>
      </div>
    </div>
  )
}

export default GameCard
