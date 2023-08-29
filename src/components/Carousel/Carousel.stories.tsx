import React from 'react'
import ReactPlayer from 'react-player'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'

import Carousel, { SlideData } from '.'
import Button from '../Button'

export default {
  title: 'Carousel/Carousel'
}

const items: SlideData[] = [
  {
    slideElement: <img src={pgCover} />,
    title: 'Phantom Galaxies',
    button: <Button>View Game</Button>
  },
  { slideElement: <img src={dtCover} />, title: 'Dark Throne' },
  { slideElement: <img src={wakeCover} />, title: 'The Wake' },
  { slideElement: <img src={onisCover} />, title: 'Onis Quest' }
]

export const Default = () => (
  <div style={{ maxWidth: 1080, maxHeight: 400 }}>
    <Carousel items={items} autoplayDelayInMs={6000} />
  </div>
)

export const ControllerDetached = () => (
  <div style={{ maxWidth: 1080, maxHeight: 400 }}>
    <Carousel
      items={items}
      autoplayDelayInMs={6000}
      controllerLayout="detached"
    />
  </div>
)

const itemsWithVideo: SlideData[] = [
  {
    slideElement: (
      <ReactPlayer
        url="https://www.youtube.com/watch?v=bGzW-ps-_vc"
        width={'100%'}
        height={'100%'}
        onPlay={() => console.log('play called')}
        onClickPreview={() => console.log('preview called')}
        controls={true}
      />
    ),
    title: '',
    thumbnail: (
      <ReactPlayer
        url="https://www.youtube.com/watch?v=bGzW-ps-_vc"
        width={'100%'}
        height={'100%'}
        light={true}
        playIcon={<></>}
        style={{ pointerEvents: 'none' }}
      />
    ),
    disableGradient: true
  },
  ...items
]

export const WithYouTubeVideos = () => {
  return (
    <div style={{ maxWidth: 1080, maxHeight: 400 }}>
      <Carousel items={itemsWithVideo} autoplayDelayInMs={6000} />
    </div>
  )
}
