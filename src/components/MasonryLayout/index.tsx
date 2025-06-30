import React from 'react'
import styles from './MasonryLayout.module.scss'
import gameImage from '@/assets/banners/QuestCardV2Image.png?url'

export interface MasonryLayoutProps {
  imageUrl?: React.ReactNode
}

const MasonryLayout = ({ imageUrl }: MasonryLayoutProps) => {
  const image = imageUrl || gameImage

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
