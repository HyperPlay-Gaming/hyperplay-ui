import React from 'react'

import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'

import Carouselv2, { SlideData } from '.'

export default {
  title: 'Carousel/Carouselv2'
}

const items: SlideData[] = [
  { img: <img src={pgCover} />, title: 'Phantom Galaxies' },
  { img: <img src={pgCover} />, title: 'Phantom Galaxies2' },
  { img: <img src={pgCover} />, title: 'Phantom Galaxies3' }
]

export const Default = () => (
  <div style={{ maxWidth: '1280px' }}>
    <Carouselv2 items={items}></Carouselv2>
  </div>
)
