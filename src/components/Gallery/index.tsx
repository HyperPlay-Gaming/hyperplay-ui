import { useEffect, useState } from 'react'

import styles from './Gallery.module.scss'

export type Asset = {
  name: string
  src: string
  type: string
}

export interface GalleryProps {
  assets: Asset[]
}

const youtubeRegex =
  /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/

export const getYouTubeEmbedURL = (url: string) => {
  const res = url.match(youtubeRegex)
  return `https://youtube.com/embed/${res?.[1]}`
}

const getThumbSrc = (asset: Asset) => {
  if (asset.type.includes('youtube') || asset.type.includes('video')) {
    return '/images/play-video.png/'
  }
  return asset.src
}

export default function Gallery(props: GalleryProps): JSX.Element {
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null)

  useEffect(() => {
    setCurrentAsset(props?.assets?.[0])
  }, [props?.assets])

  let media = null
  if (currentAsset?.type.includes('image')) {
    media = (
      <img
        src={currentAsset.src}
        className={styles.image}
        alt={currentAsset.name}
      />
    )
  } else if (currentAsset?.type.includes('video')) {
    media = (
      <video controls className={styles.video}>
        <source src={currentAsset.src} type={currentAsset.type} />
      </video>
    )
  } else if (currentAsset?.type.includes('youtube')) {
    media = (
      <iframe
        width="100%"
        src={getYouTubeEmbedURL(currentAsset.src)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <div>
      <div className={styles.preview}>{media}</div>
      <div className={styles.items}>
        {props?.assets?.map((asset, index) => (
          <img
            key={asset.name + String(index)}
            onClick={() => setCurrentAsset(asset)}
            src={getThumbSrc(asset)}
            alt={`${asset.name}-preview`}
            className={styles.imageThumbnail}
          />
        ))}
      </div>
    </div>
  )
}
