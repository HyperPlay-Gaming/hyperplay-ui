import React from 'react'

import { getETAStringFromMs } from '@hyperplay/utils'

import { CloseButton, PauseIcon, Resume, PlayIcon } from '@/assets/images'
import Button from '@/components/Button'

import DownloadToastStyles from './index.module.scss'
import { size } from './utils'

export type downloadStatus =
  | 'inProgress'
  | 'paused'
  | 'showOnlyCancel'
  | 'done'
  | 'inExtraction'

interface DownloadToastType {
  imgUrl: string
  gameTitle: string
  downloadedInBytes: number
  downloadSizeInBytes: number
  estimatedCompletionTimeInMs: number
  onCancelClick: () => void
  onPauseClick: () => void
  onStartClick: () => void
  onCloseClick: () => void
  onPlayClick: () => void
  status: downloadStatus
  statusText?: string
}

export default function DownloadToast(props: DownloadToastType) {
  // check that percent completed <= 100
  let percentCompleted =
    props.downloadSizeInBytes > 0
      ? Math.round((props.downloadedInBytes / props.downloadSizeInBytes) * 100)
      : 0
  if (percentCompleted > 100) percentCompleted = 100
  let percentCompletedStr = percentCompleted.toString()

  // check if negative
  let estCompleteTimeInMs = props.estimatedCompletionTimeInMs
  if (props.estimatedCompletionTimeInMs < 0) {
    console.error('Estimated completion time was negative!')
    estCompleteTimeInMs = 0
  }

  let downloadedInBytes = props.downloadedInBytes
  if (downloadedInBytes < 0) {
    console.error('Downloaded size was negative!')
    downloadedInBytes = 0
  }

  let downloadSize = props.downloadSizeInBytes
  if (downloadSize < 0) {
    console.error('Download size was negative!')
    downloadSize = 0
  }

  // prevent string from being too long
  let etaString = getETAStringFromMs(estCompleteTimeInMs)
  const downloadedString = size(downloadedInBytes)
  let downloadSizeString = size(downloadSize)

  // No download is 0 bytes so if 0 bytes is sent, it is because we don't know how big it is
  // This will also handle the error case if downloadSize is negative from the if statement above
  if (downloadSize === 0) {
    etaString = '??'
    downloadSizeString = '??'
    percentCompletedStr = '??'
  }

  const progressBarStyle = {
    '--download-progress-bar-percentage': `${percentCompleted}%`
  } as React.CSSProperties

  function getActionButton(status: downloadStatus) {
    if (status === 'done')
      return (
        <Button type="primary" size="small" onClick={props.onPlayClick}>
          <PlayIcon className={DownloadToastStyles.playIcon} />
          <span>Play</span>
        </Button>
      )
    if (status === 'showOnlyCancel') return null
    if (status === 'inExtraction') return null
    if (status === 'inProgress')
      return (
        <Button type="secondary" size="small" onClick={props.onPauseClick}>
          <PauseIcon className={DownloadToastStyles.pauseIcon} />
          <span>Pause</span>
        </Button>
      )
    if (status === 'paused')
      return (
        <Button type="secondary" size="small" onClick={props.onStartClick}>
          <Resume className={DownloadToastStyles.resumeIcon} />
          <span>Resume</span>
        </Button>
      )
  }
  return (
    <div className={DownloadToastStyles.downloadToastContainer}>
      <div className={DownloadToastStyles.topBar}>
        <div className="title-sm">{props.statusText ?? 'Downloading'}</div>
        <button
          onClick={props.onCloseClick}
          className={DownloadToastStyles.closeButton}
        >
          <CloseButton />
        </button>
      </div>
      <div className={DownloadToastStyles.contentContainer}>
        <div>
          <img src={props.imgUrl} className={DownloadToastStyles.gameImage} />
        </div>
        <div className={DownloadToastStyles.detailsContainer}>
          <div className={`body-sm ${DownloadToastStyles.gameTitle}`}>
            {props.gameTitle}
          </div>
          <div className={DownloadToastStyles.statusContainer}>
            <div className={DownloadToastStyles.downloadNumberContainer}>
              <div className="eyebrow">{downloadedString}</div>
              <div className="eyebrow">{` / `}</div>
              <div className="eyebrow">{`${downloadSizeString}`}</div>
            </div>

            <div className="eyebrow">ETA: {etaString}</div>
          </div>
          <div
            className={DownloadToastStyles.progressBar}
            style={progressBarStyle}
          >
            <div className={`menu ${DownloadToastStyles.percentCompletedText}`}>
              {percentCompletedStr}%
            </div>
          </div>
        </div>
      </div>
      <div className={DownloadToastStyles.manageDownloadContainer}>
        {props.status !== 'done' ? (
          <Button type="danger" size="small" onClick={props.onCancelClick}>
            <CloseButton className={DownloadToastStyles.cancelIcon} />
            <span>Cancel</span>
          </Button>
        ) : null}
        {getActionButton(props.status)}
      </div>
    </div>
  )
}
