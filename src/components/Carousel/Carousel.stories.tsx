import React from 'react'
import ReactPlayer from 'react-player'

import { Meta, StoryObj } from '@storybook/react'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'

import Carousel, { CarouselProps } from '.'
import { ControllerProps } from './components/Controller'

const meta: Meta<typeof Carousel> = {
  title: 'Carousel/Carousel',
  component: Carousel
}

export default meta

type Story = StoryObj<typeof Carousel>

const images = [pgCover, dtCover, wakeCover, onisCover]

interface CarouselPropsParams {
  controllerLayout?: ControllerProps['controllerLayout']
}

const imgSlides = images.map((val) => (
  <Carousel.Slide key={val}>
    <img src={val} />
  </Carousel.Slide>
))

const imagesForThumbnail = images.map((val) => <img key={val} src={val} />)

const imagesAndVideosForThumbnail = [
  <ReactPlayer
    height="100%"
    width="100%"
    url="https://youtu.be/Geg2-ru5eik?si=iKoSISEPybB_xYId"
    style={{ pointerEvents: 'none' }}
    playIcon={<></>}
    light={true}
  />,
  ...imagesForThumbnail
]

const props: (props: CarouselPropsParams) => CarouselProps = ({
  controllerLayout = 'attached'
}: CarouselPropsParams) => ({
  children: (
    <>
      <Carousel.SlideVideo
        indexInSlides={0}
        reactPlayerProps={{
          url: 'https://youtu.be/mLyOj_QD4a4?si=HBcqzH1HI7TuB1Gd'
        }}
      />
      {imgSlides}
    </>
  ),
  delay: 6000,
  childrenNotInCarousel: (
    <Carousel.Controller
      controllerLayout={controllerLayout}
      images={imagesAndVideosForThumbnail}
    />
  )
})

export const Default: Story = {
  args: { ...props({}) }
}

export const ControllerDetached: Story = {
  args: { ...props({ controllerLayout: 'detached' }) }
}

export const NoVideo: Story = {
  args: {
    autoplayOptions: { delay: 3000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        controllerLayout={'detached'}
        images={imagesForThumbnail}
      />
    )
  }
}
