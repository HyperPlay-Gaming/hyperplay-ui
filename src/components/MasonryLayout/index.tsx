import React from 'react'
import styles from './MasonryLayout.module.scss'
import gameImage from '@/assets/banners/QuestCardV2Image.png?url'
import Image from 'next/image'

export interface MasonryLayoutProps {
  imageUrl?: React.ReactNode
}

const MasonryLayout = ({ imageUrl }: MasonryLayoutProps) => {
  const image = imageUrl || (
    <Image
      src={gameImage}
      alt="game image"
      fill
      style={{ objectFit: 'cover' }}
    />
  )

  return (
    <div className={styles.masonryGrid}>
      <div className={styles.largeImage}>{image}</div>
      <div className={styles.mediumImagesContainer}>
        <div className={styles.mediumImage}>{image}</div>
        <div className={styles.mediumImage}>{image}</div>
        <div className={styles.mediumImage}>{image}</div>
        <div className={styles.mediumImage}>{image}</div>
      </div>
    </div>
  )
}

export default MasonryLayout
