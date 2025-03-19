import React from 'react'
import ReactPlayer from 'react-player'

import { wait } from '@hyperplay/utils'
import { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'
import questCard from '@/assets/banners/QuestCardV2Image.png?url'

import Carousel, { CarouselProps } from '.'
import { ControllerProps } from './components/Controller'

const meta: Meta<typeof Carousel> = {
  title: 'Carousel/Carousel',
  component: Carousel
}

export default meta

type Story = StoryObj<typeof Carousel>

const images = [pgCover, dtCover, wakeCover, onisCover, questCard]

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
  controllerLayout = 'detached'
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
  autoplayOptions: { delay: 6000 },
  childrenNotInCarousel: (
    <Carousel.Controller
      controllerLayout={controllerLayout}
      images={imagesAndVideosForThumbnail}
      showGradientBorder={false}
      showItemLoadBar={true}
    />
  )
})

export const Default: Story = {
  args: { ...props({}) }
}

export const ControllerAttached: Story = {
  args: { ...props({ controllerLayout: 'attached' }) }
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

/**
 * @dev it is okay if slide overflows on bottom since we match width and keep the aspect ratio
 */
function slideIsVisible(slide: HTMLElement) {
  const box = slide.getBoundingClientRect()
  return box.top >= 0 && box.left >= 0 && box.right <= window.innerWidth
}

async function expectSlideToBeVisible(slide: HTMLElement) {
  await expect(slide).toBeVisible()
  console.log(
    'slide is visible ',
    slideIsVisible(slide),
    ' slide.getBoundingClientRect() ',
    slide.getBoundingClientRect(),
    ' window width ',
    window.innerWidth
  )
  return expect(slideIsVisible(slide)).toBeTruthy()
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
    autoplayOptions: { delay: 2000 },
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
    await expectSlideToNotBeVisible(imgSlide1)
    const imgSlide2 = canvas.getByTestId('img-slide-2')
    await expectSlideToNotBeVisible(imgSlide2)

    await wait(2800)
    await expectSlideToNotBeVisible(imgSlide0)
    await expectSlideToBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)

    await wait(2000)
    await expectSlideToNotBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToBeVisible(imgSlide2)

    await wait(2000)
    await expectSlideToBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)
  }
}

type propsWithVidProps = CarouselPropsParams & {
  delay?: number
  onVideoEnd?: () => void
}

const propsWithShortVideo: (props: propsWithVidProps) => CarouselProps = ({
  controllerLayout = 'attached',
  delay = 1000,
  onVideoEnd
}: propsWithVidProps) => ({
  children: (
    <>
      <Carousel.SlideVideo
        indexInSlides={0}
        reactPlayerProps={{
          url: 'https://youtu.be/_asNhzXq72w?si=AX1hf2pAKwtNiYs3'
        }}
        slideProps={{ 'data-testid': 'video-slide-0' }}
        onEnd={onVideoEnd}
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

let videoEndedRes: (val?: unknown) => void | undefined
const videoEnded = new Promise((res) => {
  videoEndedRes = res
})

const videoEndHandler = () => {
  videoEndedRes()
}
/**
 * @dev tests that autoscroll stops for videos until the video is done
 * should quickly scroll to next controller item when the video finishes
 * @TODO check controller item state like loader bar
 */
export const TestVideoAutoscrollStory: Story = {
  tags: ['test-only'],
  args: propsWithShortVideo({ onVideoEnd: videoEndHandler, delay: 10000 }),
  play: async ({ mount, args }) => {
    console.log('starting test')
    const canvas = await mount(<Carousel {...args} />)
    const videoSlide0 = canvas.getByTestId('video-slide-0')
    console.log('waiting for video slide to load')
    await waitFor(async () =>
      expect(videoSlide0.offsetWidth).toBeGreaterThan(500)
    )
    await expectSlideToBeVisible(videoSlide0)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await expectSlideToNotBeVisible(imgSlide0)
    const imgSlide1 = canvas.getByTestId('img-slide-1')
    await expectSlideToNotBeVisible(imgSlide1)

    await videoEnded
    const time = Date.now()
    console.log('waiting for first image slide to be visible')
    await waitFor(async () => expectSlideToBeVisible(imgSlide0), {
      timeout: 20000
    })
    const timeAfter = Date.now()
    expect(timeAfter - time).toBeLessThan(1000)
  }
}

async function expectItemsVisibility(
  /* eslint-disable-next-line */
  canvas: ReturnType<typeof within>,
  isVisible: boolean[],
  testIdPrefix = 'carousel-controller-item-'
) {
  for (let i = 0; i < isVisible.length; ++i) {
    if (isVisible[i]) {
      await expect(canvas.getByTestId(`${testIdPrefix}${i}`)).toBeDefined()
    } else {
      const allItemsWithId = await canvas.queryByTestId(`${testIdPrefix}${i}`)
      await expect(allItemsWithId).toBe(null)
    }
  }
}

async function expectSlidesVisibility(
  /* eslint-disable-next-line */
  canvas: ReturnType<typeof within>,
  isVisible: boolean[],
  testIdPrefix = 'img-slide-'
) {
  for (let i = 0; i < isVisible.length; ++i) {
    if (isVisible[i]) {
      await expectSlideToBeVisible(canvas.getByTestId(`${testIdPrefix}${i}`))
    } else {
      await expectSlideToNotBeVisible(canvas.getByTestId(`${testIdPrefix}${i}`))
    }
  }
}

/**
 * @dev arrows can change items in the controller view but doesn't change what the user has selected.
 * this also tests autoscroll for images after using right arrow.
 * when it changes to an offscreen controller item, all the items scroll into view.
 * slices in intervals of numItemsToShow and has empty controller item positions. arrows do not shift positions.
 * if there are more items than can be shown in the controller items list, then wrap it.
 */
export const TestImageAutoscrollAfterClickStory: Story = {
  args: {
    autoplayOptions: { delay: 2000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        controllerLayout={'detached'}
        images={imagesForThumbnail}
        numItemsToShow={4}
      />
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
    )
    const imgSlide1 = canvas.getByTestId('img-slide-1')
    const imgSlide2 = canvas.getByTestId('img-slide-2')
    const allButLastItemShown = [true, true, true, true, false]
    await step('first 4 controller items are shown initially', async () => {
      await expectSlideToBeVisible(imgSlide0)
      await expectSlideToNotBeVisible(imgSlide1)
      await expectSlideToNotBeVisible(imgSlide2)

      // expect first 4 controller items visible
      await expectItemsVisibility(canvas, allButLastItemShown)
    })

    const rightButton = canvas.getByTestId('carousel-right-button')
    const lastItemShown = [false, false, false, false, true]

    await step(
      'click the right button. only the 5th item is shown',
      async () => {
        rightButton.click()
        await wait(500)

        // expect controller items to change
        await expectItemsVisibility(canvas, lastItemShown)
      }
    )

    await step('autoscroll still works', async () => {
      await wait(2200)
      const vis = [false, true, false, false, false]
      await expectSlidesVisibility(canvas, vis)
      await expectItemsVisibility(canvas, lastItemShown)
      for (let i = 2; i < 5; ++i) {
        await wait(2000)
        const vis_i = [false, false, false, false, false]
        vis_i[i] = true
        await expectSlidesVisibility(canvas, vis_i)
        await expectItemsVisibility(canvas, lastItemShown)
      }

      await wait(2000)
      const firstItemVis = Array(5).fill(false)
      firstItemVis[0] = true
      await expectSlidesVisibility(canvas, firstItemVis)
      await expectItemsVisibility(canvas, lastItemShown)
    })

    await step(
      'click the right button. first 4 items are shown again',
      async () => {
        rightButton.click()
        await wait(500)
        expectItemsVisibility(canvas, allButLastItemShown)
      }
    )
  }
}

/**
 * @dev disable arrows if num items in controller is <= numItemsToShow
 */
export const TestControllerArrowDisabledStory: Story = {
  args: {
    autoplayOptions: { delay: 1000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        controllerLayout={'detached'}
        images={imagesForThumbnail}
        numItemsToShow={5}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
    )

    const rightButton = canvas.getByTestId('carousel-right-button')
    await expect(rightButton).toBeDisabled()

    const leftButton = canvas.getByTestId('carousel-left-button')
    await expect(leftButton).toBeDisabled()
  }
}
