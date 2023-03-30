import React from 'react'

import ContentCarousel, { ContentCarouselProps } from '.'

export default {
  title: 'Carousel/ContentCarousel',
  component: ContentCarousel
}

const items: ContentCarouselProps['items'] = [
  {
    type: 'image',
    imageElement: (
      <img
        src="https://picsum.photos/500/200"
        key=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    )
  },
  {
    type: 'youtube',
    thumbnailElement: (
      <img src="https://img.youtube.com/vi/bGzW-ps-_vc/0.jpg" key="" />
    ),
    youtubeId: 'bGzW-ps-_vc'
  }
]

export const Default = () => (
  <div style={{ width: '100%', height: 500 }}>
    <ContentCarousel items={[...items, ...items, ...items, ...items]} />
  </div>
)