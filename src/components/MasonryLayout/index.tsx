import React from 'react'
import styles from './MasonryLayout.module.scss'

import classNames from 'classnames'

export interface MasonryLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images?: React.ReactNode[]
  imageUrl?: string
}

const MasonryLayout = ({ images, ...props }: MasonryLayoutProps) => {
  if (!images || images.length < 1) return null

  //If more than 5 images, it uses the 5-image layout and show only first 5
  const displayImages = images.length > 5 ? images.slice(0, 5) : images
  const imageCount = displayImages.length

  const getGridClasses = () => {
    const baseClasses = [styles.masonryGrid]
    const gridClass = styles[`masonryGrid--${imageCount}`]
    if (gridClass) {
      baseClasses.push(gridClass)
    }
    return baseClasses
  }

  const renderLayout = () => {
    if (imageCount === 1) {
      return <div className={styles.mediumImage}>{displayImages[0]}</div>
    } else if (imageCount === 2) {
      return displayImages.map((img, i) => (
        <div className={styles.mediumImage} key={i}>
          {img}
        </div>
      ))
    } else if (imageCount === 3) {
      return displayImages.map((img, i) => (
        <div className={styles.mediumImage} key={i}>
          {img}
        </div>
      ))
    } else if (imageCount === 4) {
      return displayImages.map((img, i) => (
        <div className={styles.smallImage} key={i}>
          {img}
        </div>
      ))
    } else if (imageCount === 5) {
      return (
        <>
          <div className={styles.largeImage}>{displayImages[0]}</div>
          <div className={styles.smallImagesContainer}>
            {displayImages.slice(1).map((img, i) => (
              <div className={styles.smallImage} key={i + 1}>
                {img}
              </div>
            ))}
          </div>
        </>
      )
    }

    return null
  }

  return (
    <div className={classNames(getGridClasses())} {...props}>
      {renderLayout()}
    </div>
  )
}

export default MasonryLayout
