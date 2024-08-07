import React, { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import usePromise from 'react-promise-suspense'

import preloadImages from '@/utils/preloadImages'
import useCSSVariable from '@/utils/useCSSVariable'

import styles from './Image.module.css'

interface ImageProps {
  src: string
}

const ImageComponent = ({ src }: ImageProps) => {
  usePromise(preloadImages, [[src]])

  return <img className={styles.proportions} src={src} />
}

const Image = (props: ImageProps) => {
  const baseColor = useCSSVariable('--color-neutral-1000')
  const highlightColor = useCSSVariable('--color-neutral-400')

  return (
    <Suspense
      fallback={
        <Skeleton
          className={styles.proportions}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      }
    >
      <ImageComponent {...props} />
    </Suspense>
  )
}

export default Image
