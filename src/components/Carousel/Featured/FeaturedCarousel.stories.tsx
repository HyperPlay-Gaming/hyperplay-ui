import React from 'react'

import FeaturedCarousel from '.'

export default {
  title: 'Carousel/FeaturedCarousel'
}
const items = [
  {
    title: 'Test',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    image: 'https://picsum.photos/1488/466',
    link: ''
  },
  {
    title: 'Test',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    image: 'https://picsum.photos/1488/467',
    link: ''
  },
  {
    title: 'Test',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    image: 'https://picsum.photos/1488/468',
    link: ''
  },
  {
    title: 'Test',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    image: 'https://picsum.photos/1488/469',
    link: ''
  }
]
export const FullWidth = () => (
  <FeaturedCarousel items={items} fullWidth={true}></FeaturedCarousel>
)

export const Default = () => <FeaturedCarousel items={items}></FeaturedCarousel>
