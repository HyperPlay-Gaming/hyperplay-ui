import React from 'react'
import { getMediaFromRelease } from '@/helpers/game/getMediaFromRelease'
import { ContentCarouselProps } from '@hyperplay/ui/dist/components/Carousel/Content'
import Image from 'next/image'

const parseMedia = (
  media: ReturnType<typeof getMediaFromRelease>
): ContentCarouselProps['items'] =>
  media.map((item) => {
    if (item.type === 'image') {
      return {
        type: 'image',
        imageElement: (
          <Image
            fill={true}
            src={item.src}
            alt=""
            style={{ objectFit: 'cover' }}
          />
        )
      }
    }

    if (item.type === 'youtube') {
      return {
        type: 'youtube',
        youtubeId: item.youtubeId,
        thumbnailElement: (
          <Image
            fill={true}
            src={item.thumbnail}
            alt=""
            style={{ objectFit: 'cover' }}
          />
        )
      }
    }

    console.warn('Unknown media type', item)
    return {
      type: 'image',
      imageElement: <></>
    }
  })

export default parseMedia
