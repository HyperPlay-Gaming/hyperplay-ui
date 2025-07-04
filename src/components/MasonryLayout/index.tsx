import React from 'react'
import styles from './MasonryLayout.module.scss'

import classNames from 'classnames'

export interface MasonryLayoutProps {
  images?: React.ReactNode[]
  imageUrl?: string
}

const MasonryLayout = ({ images }: MasonryLayoutProps) => {
  if (!images || images.length < 1 || images.length > 5) return null

  const gridClass =
    images.length === 5
      ? [styles.masonryGrid, styles['masonryGrid--5']]
      : images.length === 4
      ? [styles.masonryGrid, styles['masonryGrid--4']]
      : images.length === 3
      ? [styles.masonryGrid, styles['masonryGrid--3']]
      : images.length === 2
      ? [styles.masonryGrid, styles['masonryGrid--2']]
      : images.length === 1
      ? [styles.masonryGrid, styles['masonryGrid--1']]
      : [styles.masonryGrid]

  switch (images.length) {
    case 5:
      return (
        <div className={classNames(...gridClass)}>
          <div className={styles.largeImage}>{images[0]}</div>
          <div className={styles.smallImagesContainer}>
            <div className={styles.smallImage}>{images[1]}</div>
            <div className={styles.smallImage}>{images[2]}</div>
            <div className={styles.smallImage}>{images[3]}</div>
            <div className={styles.smallImage}>{images[4]}</div>
          </div>
        </div>
      )
    case 4:
      return (
        <div className={classNames(...gridClass)}>
          {images.map((img, i) => (
            <div className={styles.smallImage} key={i}>
              {img}
            </div>
          ))}
        </div>
      )
    case 3:
      return (
        <div className={classNames(...gridClass)}>
          {images.map((img, i) => (
            <div className={styles.mediumImage} key={i}>
              {img}
            </div>
          ))}
        </div>
      )
    case 2:
      return (
        <div className={classNames(...gridClass)}>
          {images.map((img, i) => (
            <div className={styles.largeImage} key={i}>
              {img}
            </div>
          ))}
        </div>
      )
    case 1:
      return (
        <div className={classNames(...gridClass)}>
          <div className={styles.largeImage}>{images[0]}</div>
        </div>
      )
    default:
      return null
  }
}

export default MasonryLayout
