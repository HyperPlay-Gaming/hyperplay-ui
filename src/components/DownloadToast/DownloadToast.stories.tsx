import React from 'react'

import DownloadToast from '.'

export default {
  title: 'DownloadToast',
  component: DownloadToast
}

export const Default = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Gods Unchained"
    downloadedInBytes={2506096644}
    downloadSizeInBytes={3506096064}
    estimatedCompletionTimeInMs={8630000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    onPlayClick={() => console.log('play clicked')}
    status="inProgress"
    statusText="Downloading"
  />
)

export const Huge = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Huge Game"
    downloadedInBytes={23226000000}
    downloadSizeInBytes={82511000000}
    estimatedCompletionTimeInMs={36360000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    onPlayClick={() => console.log('play clicked')}
    status="inProgress"
    statusText="Downloading"
  />
)

export const zeroPercent = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Gods Unchained"
    downloadedInBytes={0}
    downloadSizeInBytes={550609664}
    estimatedCompletionTimeInMs={0}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    onPlayClick={() => console.log('play clicked')}
    status="inProgress"
    statusText="Downloading"
  />
)

export const hundredPercent = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Gods Unchained"
    downloadedInBytes={550609664}
    downloadSizeInBytes={550609664}
    estimatedCompletionTimeInMs={3601000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    onPlayClick={() => console.log('play clicked')}
    status="showOnlyCancel"
    statusText="Downloading"
  />
)

export const tooLong = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Gods Unchained"
    downloadedInBytes={111515}
    downloadSizeInBytes={321200000000000}
    estimatedCompletionTimeInMs={86500000000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    onPlayClick={() => console.log('play clicked')}
    status="inProgress"
    statusText="Downloading"
  />
)

export const paused = () => (
  <div
    style={{
      position: 'absolute',
      right: '5%',
      bottom: '5%',
      width: '400px'
    }}
  >
    <DownloadToast
      imgUrl="src/assets/stories/TheWakeCover.png"
      gameTitle="Gods Unchained"
      downloadedInBytes={560609664}
      downloadSizeInBytes={0}
      estimatedCompletionTimeInMs={2710000}
      onCancelClick={() => console.log('cancel clicked')}
      onPauseClick={() => console.log('pause clicked')}
      onStartClick={() => console.log('start clicked')}
      onCloseClick={() => console.log('close clicked')}
      onPlayClick={() => console.log('play clicked')}
      status="paused"
      statusText="Paused"
    />
  </div>
)

export const done = () => (
  <div
    style={{
      position: 'absolute',
      right: '5%',
      bottom: '5%',
      width: '400px'
    }}
  >
    <DownloadToast
      imgUrl="src/assets/stories/TheWakeCover.png"
      gameTitle="Gods Unchained"
      downloadedInBytes={560609664}
      downloadSizeInBytes={560609664}
      estimatedCompletionTimeInMs={0}
      onCancelClick={() => console.log('cancel clicked')}
      onPauseClick={() => console.log('pause clicked')}
      onStartClick={() => console.log('start clicked')}
      onCloseClick={() => console.log('close clicked')}
      onPlayClick={() => console.log('play clicked')}
      status="done"
      statusText="Ready to Play"
    />
  </div>
)

export const extraction = () => (
  <div
    style={{
      position: 'absolute',
      right: '5%',
      bottom: '5%',
      width: '400px'
    }}
  >
    <DownloadToast
      imgUrl="src/assets/stories/TheWakeCover.png"
      gameTitle="Gods Unchained"
      downloadedInBytes={250609664}
      downloadSizeInBytes={550609664}
      estimatedCompletionTimeInMs={8600000}
      onCancelClick={() => console.log('cancel clicked')}
      onPauseClick={() => console.log('pause clicked')}
      onStartClick={() => console.log('start clicked')}
      onCloseClick={() => console.log('close clicked')}
      onPlayClick={() => console.log('play clicked')}
      status="inExtraction"
      statusText="Ready to Play"
    />
  </div>
)

export const downloadedBiggerThanSize = () => (
  <div
    style={{
      position: 'absolute',
      right: '5%',
      bottom: '5%',
      width: '400px'
    }}
  >
    <DownloadToast
      imgUrl="src/assets/stories/TheWakeCover.png"
      gameTitle="Gods Unchained"
      downloadedInBytes={3506009664}
      downloadSizeInBytes={2506009664}
      estimatedCompletionTimeInMs={8600000}
      onCancelClick={() => console.log('cancel clicked')}
      onPauseClick={() => console.log('pause clicked')}
      onStartClick={() => console.log('start clicked')}
      onCloseClick={() => console.log('close clicked')}
      onPlayClick={() => console.log('play clicked')}
      status="inProgress"
      statusText="Downloading"
    />
  </div>
)
