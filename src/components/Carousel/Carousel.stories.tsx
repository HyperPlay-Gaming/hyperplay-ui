import React from 'react'
import ReactPlayer from 'react-player'

import { wait } from '@hyperplay/utils'
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'
import questCard from '@/assets/banners/QuestCardV2Image.png?url'

import Carousel, { CarouselProps } from '.'
import { ItemData } from './components/Controller'
import {
  checkThatLoaderBarIsProgressing,
  checkThatLoaderBarStopped,
  expectItemsVisibility,
  expectSlideToBeVisible,
  expectSlideToNotBeVisible,
  expectSlidesVisibility,
  getLoaderBarWidth
} from './storyHelpers'

const meta: Meta<typeof Carousel> = {
  title: 'Carousel/Carousel',
  component: Carousel
}

export default meta

type Story = StoryObj<typeof Carousel>

const images = [pgCover, dtCover, wakeCover, onisCover, questCard]

const imgSlides = images.map((val, index) => (
  <Carousel.Slide key={val} data-testid={`img-slide-${index}`}>
    <img src={val} />
  </Carousel.Slide>
))

const imagesForThumbnail: ItemData[] = images.map((val) => ({
  image: <img key={val} src={val} />
}))

const videoThumbnail = (
  <ReactPlayer
    height="100%"
    width="100%"
    url="https://youtu.be/_asNhzXq72w?si=AX1hf2pAKwtNiYs3"
    style={{ pointerEvents: 'none' }}
    playIcon={<></>}
    light={true}
    key="video_hero_0"
  />
)

const imagesAndVideosForThumbnail: ItemData[] = [
  {
    image: videoThumbnail,
    isVideoSlide: true
  },
  ...imagesForThumbnail
]

const videoSlide = (
  <Carousel.SlideVideo
    indexInSlides={0}
    reactPlayerProps={{
      url: 'https://youtu.be/_asNhzXq72w?si=AX1hf2pAKwtNiYs3'
    }}
    slideProps={{ 'data-testid': 'video-slide-0' }}
  />
)

const props = {
  children: (
    <>
      {videoSlide}
      {imgSlides}
    </>
  ),
  autoplayOptions: { delay: 6000 },
  childrenNotInCarousel: (
    <Carousel.Controller
      itemsData={imagesAndVideosForThumbnail}
      showItemLoadBar={true}
    />
  )
}

export const Default: Story = {
  args: props
}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  args: props
}

export const NoVideo: Story = {
  args: {
    autoplayOptions: { delay: 3000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        itemsData={imagesForThumbnail}
        showItemLoadBar={true}
      />
    )
  }
}

export const IsLoading: Story = {
  args: { isLoading: true, ...props },
  render: (args) => (
    <div style={{ width: '100vw' }}>
      <Carousel {...args} />
    </div>
  )
}

const videos = [
  'https://youtu.be/U-DtrujeD3k?si=2zM6kFtMDFDt9hOt',
  'https://youtu.be/dNf6-Qd6z0k?si=I-c2NP3peYQ78PR6',
  'https://youtu.be/x1SecGez6as?si=UGxnMxG2E830Y5DS'
]

const imagesAndMultipleVideosForThumbnail: ItemData[] = [
  {
    image: (
      <ReactPlayer
        height="100%"
        width="100%"
        url={videos[0]}
        style={{ pointerEvents: 'none' }}
        playIcon={<></>}
        light={true}
        key="video_hero_0"
      />
    ),
    isVideoSlide: true
  },
  {
    image: (
      <ReactPlayer
        height="100%"
        width="100%"
        url={videos[1]}
        style={{ pointerEvents: 'none' }}
        playIcon={<></>}
        light={true}
        key="video_hero_0"
      />
    ),
    isVideoSlide: true
  },
  {
    image: (
      <ReactPlayer
        height="100%"
        width="100%"
        url={videos[2]}
        style={{ pointerEvents: 'none' }}
        playIcon={<></>}
        light={true}
        key="video_hero_0"
      />
    ),
    isVideoSlide: true
  },
  ...imagesForThumbnail
]
const propsMultipleVideos = {
  children: (
    <>
      <Carousel.SlideVideo
        indexInSlides={0}
        reactPlayerProps={{
          url: videos[0]
        }}
        slideProps={{ 'data-testid': 'video-slide-0' }}
      />

      <Carousel.SlideVideo
        indexInSlides={1}
        reactPlayerProps={{
          url: videos[1]
        }}
        slideProps={{ 'data-testid': 'video-slide-0' }}
      />

      <Carousel.SlideVideo
        indexInSlides={2}
        reactPlayerProps={{
          url: videos[2]
        }}
        slideProps={{ 'data-testid': 'video-slide-0' }}
      />
      {imgSlides}
    </>
  ),
  autoplayOptions: { delay: 6000 },
  childrenNotInCarousel: (
    <Carousel.Controller
      itemsData={imagesAndMultipleVideosForThumbnail}
      showItemLoadBar={true}
    />
  )
}

export const MultipleVideos: Story = {
  args: propsMultipleVideos
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
      <Carousel.Controller itemsData={imagesForThumbnail.slice(0, 3)} />
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

    await wait(3300)
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

type propsWithVidProps = {
  delay?: number
  onVideoEnd?: () => void
}

const imagesAndVideosForShortVideoThumbnail: ItemData[] = [
  {
    image: (
      <ReactPlayer
        height="100%"
        width="100%"
        url="http://localhost:6006/src/assets/tentacle-small.webm"
        style={{ pointerEvents: 'none' }}
        playIcon={<></>}
        light={true}
        key="video_hero_0"
      />
    ),
    isVideoSlide: true
  },
  ...imagesForThumbnail
]

const propsWithShortVideo: (props: propsWithVidProps) => CarouselProps = ({
  delay = 1000,
  onVideoEnd
}: propsWithVidProps) => ({
  children: (
    <>
      <Carousel.SlideVideo
        indexInSlides={0}
        reactPlayerProps={{
          url: 'http://localhost:6006/src/assets/tentacle-small.webm'
        }}
        onEnd={onVideoEnd}
      />
      {imgSlides}
    </>
  ),
  autoplayOptions: {
    delay
  },
  childrenNotInCarousel: (
    <Carousel.Controller
      itemsData={imagesAndVideosForShortVideoThumbnail}
      showItemLoadBar={true}
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
 */
export const TestVideoAutoscrollStory: Story = {
  // @TODO figure out how to load the video in the GHA
  tags: ['skip-test'],
  args: propsWithShortVideo({ onVideoEnd: videoEndHandler, delay: 10000 }),
  play: async ({ mount, args }) => {
    const canvas = await mount(<Carousel {...args} />)
    const videoSlide0 = canvas.getByTestId('video-slide-0')
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
    await waitFor(async () => expectSlideToBeVisible(imgSlide0), {
      timeout: 20000
    })
    const timeAfter = Date.now()
    expect(timeAfter - time).toBeLessThan(1000)
  }
}

/**
 * @dev tests that loader stops when video is paused.
 * navigating to a new item after pausing a video restarts the loader and autoplay
 */
export const TestVideoPauseAndAutoscrollStory: Story = {
  // @TODO figure out how to load the video in the GHA
  tags: ['skip-test'],
  args: propsWithShortVideo({ delay: 2000 }),
  play: async ({ mount, args, step }) => {
    const canvas = await mount(<Carousel {...args} />)
    const videoSlide0 = canvas.getByTestId('video-slide-0')
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    const imgSlide1 = canvas.getByTestId('img-slide-1')
    const item1 = canvas.getByTestId('carousel-controller-item-1')
    await step('initialize the carousel and check initial state', async () => {
      await waitFor(async () =>
        expect(videoSlide0.offsetWidth).toBeGreaterThan(500)
      )
      await expectSlideToBeVisible(videoSlide0)
      await expectSlideToNotBeVisible(imgSlide0)
      await expectSlideToNotBeVisible(imgSlide1)
    })

    await step(
      'pause the video and check that the loader is paused also',
      async () => {
        await wait(1000)
        const videos = videoSlide0.querySelectorAll('video')
        videos[0].pause()
        const itemLoader0 = canvas.getByTestId(
          'carousel-controller-item-loader-0'
        )
        await wait(1000)
        const pausedLoaderWidthStart = itemLoader0.clientWidth
        await wait(500)
        expect(itemLoader0.clientWidth).toEqual(pausedLoaderWidthStart)
      }
    )

    await step(
      'click the next image item and check that the loader starts progressing again from 0',
      async () => {
        item1.click()
        await wait(1000)
        const itemLoader1 = canvas.getByTestId(
          'carousel-controller-item-loader-1'
        )
        expect(itemLoader1).toBeVisible()
        await expectSlideToBeVisible(imgSlide0)
      }
    )

    await step(
      'wait until autoplay should be finished and check that the 3rd slide is now shown',
      async () => {
        await wait(2000)
        await expectSlideToNotBeVisible(imgSlide0)
        await expectSlideToBeVisible(imgSlide1)
      }
    )
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
        itemsData={imagesForThumbnail}
        numItemsToShow={4}
        showItemLoadBar={true}
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
      await expectItemsVisibility(canvas, allButLastItemShown)
      for (let i = 2; i < 5; ++i) {
        await wait(2000)
        const vis_i = [false, false, false, false, false]
        vis_i[i] = true
        await expectSlidesVisibility(canvas, vis_i)
        if (i === 4) {
          await expectItemsVisibility(canvas, lastItemShown)
        } else {
          await expectItemsVisibility(canvas, allButLastItemShown)
        }
      }

      await wait(2100)
      const firstItemVis = Array(5).fill(false)
      firstItemVis[0] = true
      await expectSlidesVisibility(canvas, firstItemVis)
      await expectItemsVisibility(canvas, allButLastItemShown)
    })

    await step(
      'click the right button. first 4 items are shown again',
      async () => {
        rightButton.click()
        await wait(300)
        expectItemsVisibility(canvas, lastItemShown)
      }
    )
  }
}

/**
 * @dev hide arrows if num items in controller is <= numItemsToShow
 */
export const ControllerArrowHiddenStory: Story = {
  args: {
    autoplayOptions: { delay: 1000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller itemsData={imagesForThumbnail} numItemsToShow={8} />
    ),
    style: { maxWidth: 1000 }
  }
}

/**
 * @dev hide arrows if num items in controller is <= numItemsToShow
 */
export const TestControllerArrowHiddenStory: Story = {
  args: {
    autoplayOptions: { delay: 1000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller itemsData={imagesForThumbnail} numItemsToShow={5} />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
    )

    await expect(
      canvas.queryByTestId('carousel-right-button')
    ).not.toBeInTheDocument()

    await expect(
      canvas.queryByTestId('carousel-left-button')
    ).not.toBeInTheDocument()
  }
}

/**
 * @dev test that there is no autoscroll on mobile
 */
export const TestNoAutoscrollImagesMobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  args: {
    autoplayOptions: { delay: 2000 },
    children: imgSlides.slice(0, 3),
    childrenNotInCarousel: (
      <Carousel.Controller itemsData={imagesForThumbnail.slice(0, 3)} />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(250)
    )

    await expectSlideToBeVisible(imgSlide0)
    const imgSlide1 = canvas.getByTestId('img-slide-1')
    await expectSlideToNotBeVisible(imgSlide1)
    const imgSlide2 = canvas.getByTestId('img-slide-2')
    await expectSlideToNotBeVisible(imgSlide2)

    await wait(2800)
    await expectSlideToBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)

    await wait(2000)
    await expectSlideToBeVisible(imgSlide0)
    await expectSlideToNotBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)

    const controllerItem1 = canvas.getByTestId('carousel-controller-item-1')
    controllerItem1.click()
    await wait(500)
    await expectSlideToNotBeVisible(imgSlide0)
    await expectSlideToBeVisible(imgSlide1)
    await expectSlideToNotBeVisible(imgSlide2)
    const controllerItem0 = canvas.getByTestId('carousel-controller-item-0')
    await expect(
      controllerItem1.classList.values().some((val) => val.includes('active'))
    ).toBeTruthy()
    await expect(
      controllerItem0.classList.values().some((val) => val.includes('active'))
    ).toBeFalsy()
  }
}

const imagesAndVideosForShortVideoThumbnailWithVideoOnSecondSlide: ItemData[] =
  [
    imagesForThumbnail[0],
    {
      image: (
        <ReactPlayer
          height="100%"
          width="100%"
          url="http://localhost:6006/src/assets/tentacle-small.webm"
          style={{ pointerEvents: 'none' }}
          playIcon={<></>}
          light={true}
          key="video_hero_0"
        />
      ),
      isVideoSlide: true
    },
    ...imagesForThumbnail.slice(1)
  ]

const propsWithShortVideoAsSecondSlide: (
  props: propsWithVidProps
) => CarouselProps = ({ delay = 1000, onVideoEnd }: propsWithVidProps) => ({
  children: (
    <>
      {imgSlides[0]}
      <Carousel.SlideVideo
        indexInSlides={1}
        reactPlayerProps={{
          url: 'http://localhost:6006/src/assets/tentacle-small.webm'
        }}
        onEnd={onVideoEnd}
      />
      {imgSlides.slice(1)}
    </>
  ),
  autoplayOptions: {
    delay
  },
  childrenNotInCarousel: (
    <Carousel.Controller
      itemsData={imagesAndVideosForShortVideoThumbnailWithVideoOnSecondSlide}
      showItemLoadBar={true}
    />
  )
})

export const TestVideoPauseAndResumeStory: Story = {
  // @TODO figure out how to load the video in the GHA
  tags: ['skip-test'],
  parameters: {
    viewport: { defaultViewport: 'desktop' }
  },
  args: propsWithShortVideoAsSecondSlide({
    delay: 10000
  }),
  play: async ({ mount, args, step }) => {
    const canvas = await mount(<Carousel {...args} />)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    const videoSlide0 = canvas.getByTestId('video-slide-1')
    const imgSlide1 = canvas.getByTestId('img-slide-1')

    await step(
      'wait for the first image to load and check initial visibilities',
      async () => {
        await waitFor(async () =>
          expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
        )
        await expectSlideToBeVisible(imgSlide0)
        await expectSlideToNotBeVisible(videoSlide0)
        await expectSlideToNotBeVisible(imgSlide1)
      }
    )

    await step(
      'click the video slide, then pause and check loader bar stopped',
      async () => {
        const videoControllerItem = canvas.getByTestId(
          'carousel-controller-item-1'
        )
        await userEvent.click(videoControllerItem, { delay: 1000 })
        const videos = videoSlide0.querySelectorAll('video')
        videos[0].pause()

        await expectSlideToNotBeVisible(imgSlide0)
        await expectSlideToBeVisible(videoSlide0)
        await expectSlideToNotBeVisible(imgSlide1)

        const videoLoaderTestId = 'carousel-controller-item-loader-1'
        await checkThatLoaderBarStopped(canvas, videoLoaderTestId)
      }
    )

    await step('resume the video and click the next image item', async () => {
      const videoLoaderTestId = 'carousel-controller-item-loader-1'
      const loaderBarWidthBefore = getLoaderBarWidth(canvas, videoLoaderTestId)
      // play video
      await userEvent.click(videoSlide0, { delay: 100 })
      const imgControllerItem1 = canvas.getByTestId(
        'carousel-controller-item-2'
      )
      // click next controller item which should pause the video automatically
      await userEvent.click(imgControllerItem1, { delay: 100 })
      const timeOnSecondImageSlideInMs = 4000
      await wait(timeOnSecondImageSlideInMs)
      // click the video controller item again which should resume the video automatically
      const videoControllerItem = canvas.getByTestId(
        'carousel-controller-item-1'
      )
      await userEvent.click(videoControllerItem, { delay: 100 })
      const loaderBarWidthAfter = await checkThatLoaderBarIsProgressing(
        canvas,
        videoLoaderTestId
      )
      const loaderBarTotalWidth = 103.5
      const loaderBarBeforePercent = Math.round(
        (loaderBarWidthBefore / loaderBarTotalWidth) * 100
      )
      const loaderBarAfterPercent = Math.round(
        (loaderBarWidthAfter / loaderBarTotalWidth) * 100
      )
      const percentPerSecond = Math.round((1 / 7) * 100)
      // if more than 1 second of progress happened in the 2s we were on the image slide, the video clearly did not pause
      expect(loaderBarAfterPercent - loaderBarBeforePercent).toBeLessThan(
        (percentPerSecond * timeOnSecondImageSlideInMs) / 1000
      )
    })
  }
}

export const TestAutoplayPauseOnDocHidden: Story = {
  args: {
    autoplayOptions: { delay: 4000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller itemsData={imagesForThumbnail} />
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    const imgSlide1 = canvas.getByTestId('img-slide-1')

    await step('verify initial slide is visible', async () => {
      await waitFor(async () =>
        expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
      )
      await expectSlideToBeVisible(imgSlide0)
      await expectSlideToNotBeVisible(imgSlide1)
    })

    await step('simulate window blur and focus', async () => {
      // Wait for 2 seconds with window focused
      await wait(2000)

      // Simulate tab hidden
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'hidden'
      })
      document.dispatchEvent(new Event('visibilitychange'))

      // Simulated tab visible
      await wait(4000)
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'visible'
      })
      document.dispatchEvent(new Event('visibilitychange'))

      // Wait another 2 seconds with window focused
      await wait(2000)

      // First slide should still be visible since autoplay pauses during blur
      // Total time is 8s but only 4s of active autoplay time has passed
      // With 2s delay, should still be on first slide
      await expectSlideToBeVisible(imgSlide0)
      await expectSlideToNotBeVisible(imgSlide1)
    })

    await step(
      'verify slide transitions after remaining active time',
      async () => {
        // Wait remaining time for first transition
        await wait(3000)

        await expectSlideToNotBeVisible(imgSlide0)
        await expectSlideToBeVisible(imgSlide1)
      }
    )
  }
}

export const TestImageScrollOnControlClickStory: Story = {
  args: {
    autoplayOptions: { delay: 200000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        itemsData={imagesForThumbnail}
        numItemsToShow={4}
        showItemLoadBar={true}
      />
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(500)
    )

    const nextControlButton = canvas.getByTestId('carousel-next-control-icon')
    const prevControlButton = canvas.getByTestId('carousel-prev-control-icon')

    await step('click the next button. 2nd slide is shown', async () => {
      await userEvent.click(nextControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [false, true, false, false],
        'img-slide-'
      )

      await userEvent.click(nextControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [false, false, true, false],
        'img-slide-'
      )
    })

    await step('click the prev then next button', async () => {
      await userEvent.click(prevControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [false, true, false, false],
        'img-slide-'
      )

      await userEvent.click(nextControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [false, false, true, false],
        'img-slide-'
      )
    })

    await step('click the next button until it loops', async () => {
      await userEvent.click(nextControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [false, false, false, true],
        'img-slide-'
      )

      await userEvent.click(nextControlButton, { delay: 100 })
      await userEvent.click(nextControlButton, { delay: 100 })
      await wait(1000)
      await expectSlidesVisibility(
        canvas,
        [true, false, false, false],
        'img-slide-'
      )
    })
  }
}

export const TestCarouselControlsNotOnMobile: Story = {
  tags: ['skip-test'],
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  args: {
    autoplayOptions: { delay: 200000 },
    children: imgSlides,
    childrenNotInCarousel: (
      <Carousel.Controller
        itemsData={imagesForThumbnail}
        numItemsToShow={4}
        showItemLoadBar={true}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgSlide0 = canvas.getByTestId('img-slide-0')
    await waitFor(async () =>
      expect(imgSlide0.offsetWidth).toBeGreaterThan(300)
    )

    await expect(canvas.queryByTestId('carousel-prev-control-icon')).toBeNull()

    await expect(canvas.queryByTestId('carousel-next-control-icon')).toBeNull()
  }
}
