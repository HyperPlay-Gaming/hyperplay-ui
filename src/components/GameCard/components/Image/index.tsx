import React, { Suspense } from 'react'
import usePromise from 'react-promise-suspense'

import { Skeleton } from '@mantine/core'

import preloadImages from '@/utils/preloadImages'

import styles from './Image.module.css'

interface ImageProps {
  src: string
}

const ImageComponent = ({ src }: ImageProps) => {
  usePromise(preloadImages, [[src]])

  return <img className={styles.proportions} src={src} />
}

const Image = (props: ImageProps) => {
  return (
    <Suspense fallback={<Skeleton className={styles.proportions} />}>
      <ImageComponent {...props} />
    </Suspense>
  )
}

export default Image
