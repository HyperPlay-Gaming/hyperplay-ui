import React, { useCallback, useMemo, useState } from 'react'
import _ReactPlayer, { ReactPlayerProps } from 'react-player'

import dtCover from '@/assets/DarkThroneLandscape.png?url'
import onisCover from '@/assets/OnisQuestLandscape.png?url'
import pgCover from '@/assets/PhantomGalaxiesLandscape.png?url'
import wakeCover from '@/assets/TheWakeLandscape.png?url'

import Carousel, { SlideData } from '.'
import Button from '../Button'

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

export default {
  title: 'Carousel/Carousel'
}

const items: SlideData[] = [
  {
    slideElement: <img src={pgCover} />,
    button: <Button>View Game</Button>
  },
  { slideElement: <img src={dtCover} /> },
  { slideElement: <img src={wakeCover} /> },
  { slideElement: <img src={onisCover} /> }
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

export const WithYouTubeVideos = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [canAutoRotate, setCanAutoRotate] = useState(true)
  const onPlay = useCallback(() => {
    console.log('On play tapped')

    setIsPlaying(true)
    setCanAutoRotate(false)
  }, [])
  const onStop = useCallback(() => {
    console.log('On stop tapped')

    setCanAutoRotate(true)

    if (isPlaying) {
      setIsPlaying(false)
    }
  }, [isPlaying])

  const onThumbnailHandler = useCallback(() => {
    console.log('On control item tapped')

    setIsPlaying(false)
    setCanAutoRotate(true)
  }, [])

  const itemsWithVideo: SlideData[] = useMemo(
    () => [
      {
        slideElement: (
          <ReactPlayer
            url="https://youtu.be/N-xHcvug3WI"
            width={'100%'}
            height={'100%'}
            onPlay={onPlay}
            onPause={onStop}
            onEnded={onStop}
            playing={isPlaying}
            onClickPreview={() => console.log('preview clicked')}
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
    ],
    [isPlaying]
  )

  return (
    <div style={{ maxWidth: 1080, maxHeight: 400 }}>
      <Carousel
        items={itemsWithVideo}
        autoplayDelayInMs={6000}
        canAutoRotate={canAutoRotate}
        onThumbnailHandler={onThumbnailHandler}
      />
    </div>
  )
}
