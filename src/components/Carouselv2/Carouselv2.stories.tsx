import React from 'react'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'

import Carouselv2, { SlideData } from '.'

export default {
  title: 'Carousel/Carouselv2'
}

const items: SlideData[] = [
  { img: <img src={pgCover} />, title: 'Phantom Galaxies' },
  { img: <img src={dtCover} />, title: 'Dark Throne' },
  { img: <img src={wakeCover} />, title: 'The Wake' },
  { img: <img src={onisCover} />, title: 'Onis Quest' }
]

export const Default = () => (
  <div style={{ maxWidth: 1080, maxHeight: 400 }}>
    <Carouselv2 items={items}></Carouselv2>
  </div>
)
