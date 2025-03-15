import React from 'react'
import ReactPlayer from 'react-player'

import { wait } from '@hyperplay/utils'
import { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'

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

const imgSlides = images.map((val, index) => (
  <Carousel.Slide key={val} data-testid={`img-slide-${index}`}>
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
    key="video_hero_0"
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
        slideProps={{ 'data-testid': 'video-slide-0' }}
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

function slideIsVisible(slide: HTMLElement) {
  const box = slide.getBoundingClientRect()
  return (
    box.top >= 0 &&
    box.bottom <= window.innerHeight &&
    box.left >= 0 &&
    box.right <= window.innerWidth
  )
}

async function expectSlideToBeVisible(slide: HTMLElement) {
  await expect(slide).toBeVisible()
  return expect(slideIsVisible(slide))
}

async function expectSlideToNotBeVisible(slide: HTMLElement) {
  return expect(slideIsVisible(slide)).toBeFalsy()
}

/**
 * @dev tests autoscroll for images and wrapping of carousel slides after finishing
 * @TODO check controller item state like loader bar
 */
export const TestImageAutoscrollStory: Story = {
  args: {
    autoplayOptions: { delay: 1000 },
    children: imgSlides.slice(0, 3),
    childrenNotInCarousel: (
      <Carousel.Controller
        controllerLayout={'detached'}
        images={imagesForThumbnail.slice(0, 3)}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
    )
    await expectSlideToBeVisible(imgSlide0)
    const imgSlide1 = canvas.getByTestId('img-slide-1')
    expectSlideToNotBeVisible(imgSlide1)
    const imgSlide2 = canvas.getByTestId('img-slide-2')
    expectSlideToNotBeVisible(imgSlide2)

    await wait(1250)
    await expectSlideToNotBeVisible(imgSlide0)
    await expectSlideToBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)

    await wait(1250)
    await expectSlideToNotBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToBeVisible(imgSlide2)

    await wait(1250)
    await expectSlideToBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)
  }
}

type propsWithVidProps = CarouselPropsParams & { delay?: number }

const propsWithShortVideo: (props: propsWithVidProps) => CarouselProps = ({
  controllerLayout = 'attached',
  delay = 1000
}: propsWithVidProps) => ({
  children: (
    <>
      <Carousel.SlideVideo
        indexInSlides={0}
        reactPlayerProps={{
          url: 'https://youtu.be/_asNhzXq72w?si=AX1hf2pAKwtNiYs3'
        }}
        slideProps={{ 'data-testid': 'video-slide-0' }}
      />
      {imgSlides}
    </>
  ),
  delay,
  childrenNotInCarousel: (
    <Carousel.Controller
      controllerLayout={controllerLayout}
      images={imagesAndVideosForThumbnail}
    />
  )
})

/**
 * @dev tests that autoscroll stops for videos until the video is done
 * should immediately scroll to next controller item when the video finishes
 * @TODO check controller item state like loader bar
 */
export const TestVideoAutoscrollStory: Story = {
  args: propsWithShortVideo({}),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const videoSlide0 = canvas.getByTestId('video-slide-0')
    await waitFor(async () =>
      expect(videoSlide0.offsetWidth).toBeGreaterThan(500)
    )
    const time = Date.now()
    await expectSlideToBeVisible(videoSlide0)
    const imgSlide1 = canvas.getByTestId('img-slide-0')
    await expectSlideToNotBeVisible(imgSlide1)
    const imgSlide2 = canvas.getByTestId('img-slide-1')
    await expectSlideToNotBeVisible(imgSlide2)

    await waitFor(
      async () => (await expectSlideToBeVisible(imgSlide1)).toBeTruthy(),
      { timeout: 20000 }
    )
    const timeAfter = Date.now()
    expect(timeAfter - time).toBeLessThan(7000)
  }
}
