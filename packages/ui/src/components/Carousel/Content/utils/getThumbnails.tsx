import React from 'react'

import { ContentCarouselProps } from '..'

const getThumbnails = (items: ContentCarouselProps['items']) =>
  items.map((item) => {
    if (item.type === 'image') {
      return item.imageElement
    }

    if (item.type === 'youtube') {
      return item.thumbnailElement
    }

    return <></>
  })

export default getThumbnails
