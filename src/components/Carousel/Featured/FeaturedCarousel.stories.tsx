import React from 'react'

import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import Button from '@/components/Button'

import FeaturedCarousel from '.'

export default {
  title: 'Carousel/FeaturedCarousel'
}

const imageElement = <img src={pgCover} />
const buttonElement = <Button>View Game</Button>
const description = '' //'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
const title = 'Phantom Galaxies'
const item = { title, description, imageElement, buttonElement }
const items = [item, item, item, item]
export const FullWidth = () => (
  <FeaturedCarousel items={items} fullWidth={true}></FeaturedCarousel>
)

export const Default = () => <FeaturedCarousel items={items}></FeaturedCarousel>
