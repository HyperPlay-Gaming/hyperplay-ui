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
    downloadedInBytes={250609664}
    downloadSizeInBytes={550609664}
    estimatedCompletionTimeInMs={86300000000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    status="inProgress"
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
    status="inProgress"
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
    status="inProgress"
  />
)

export const paused = () => (
  <DownloadToast
    imgUrl="src/assets/stories/TheWakeCover.png"
    gameTitle="Gods Unchained"
    downloadedInBytes={543609664}
    downloadSizeInBytes={550609664}
    estimatedCompletionTimeInMs={2710000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
    status="paused"
  />
)
