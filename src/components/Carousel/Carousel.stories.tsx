import React from 'react'

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
const props: (props: CarouselPropsParams) => CarouselProps = ({
  controllerLayout = 'attached'
}: CarouselPropsParams) => ({
  children: images.map((val) => (
    <Carousel.Slide key={val}>
      <img src={val} />
    </Carousel.Slide>
  )),
  autoplayDelayInMs: 6000,
  childrenNotInCarousel: (
    <Carousel.Controller
      controllerLayout={controllerLayout}
      images={images.map((val) => (
        <img key={val} src={val} />
      ))}
    />
  )
})

export const Default: Story = {
  args: { ...props({}) }
}

export const ControllerDetached: Story = {
  args: { ...props({ controllerLayout: 'detached' }) }
}
