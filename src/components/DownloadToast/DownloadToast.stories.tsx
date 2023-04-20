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
    downloadSizeInBytes={439666077}
    estimatedCompletionTimeInMs={40000}
    onCancelClick={() => console.log('cancel clicked')}
    onPauseClick={() => console.log('pause clicked')}
    onStartClick={() => console.log('start clicked')}
    onCloseClick={() => console.log('close clicked')}
  />
)
