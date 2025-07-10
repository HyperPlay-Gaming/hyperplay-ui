import React, { Suspense } from 'react'
import usePromise from 'react-promise-suspense'

import preloadImages from '@/utils/preloadImages'

import styles from './Image.module.scss'
import classNames from 'classnames'

interface ImageProps {
  src: string
}

const ImageComponent = ({ src }: ImageProps) => {
  usePromise(preloadImages, [[src]])

  return <img className={styles.proportions} src={src} />
}

const Image = (props: ImageProps) => {
  return (
    <Suspense
      fallback={
        <div className={classNames(styles.proportions, styles.loading)} />
      }
    >
      <ImageComponent {...props} />
    </Suspense>
  )
}

export default Image
