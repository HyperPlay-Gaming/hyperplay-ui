import React from 'react'

import { CloseButton, PauseIcon, PlayIcon, XCircle } from '@/assets/images'

import DownloadToastStyles from './index.module.scss'

export type downloadStatus = 'inProgress' | 'paused' | 'showOnlyCancel' | 'done'

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
}

function getETAStringFromMs(etaInMs: number) {
  const totalSeconds = Math.round(etaInMs / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const days = Math.floor(totalSeconds / 86400)
  let etaString = ''
  if (days !== 0) etaString += `${days}d`
  if (hours !== 0) etaString += (etaString === '' ? '' : ':') + `${hours}h`
  if (minutes !== 0) etaString += (etaString === '' ? '' : ':') + `${minutes}m`
  if (seconds !== 0) etaString += (etaString === '' ? '' : ':') + `${seconds}s`
  if (etaString === '') return '0s'
  return etaString
}

function getSizeStringFromBytes(bytes: number) {
  const kb = bytes / 1024
  const mb = kb / 1024
  const gb = mb / 1024
  const tb = gb / 1024
  if (tb > 1) {
    return `${Math.floor(tb)}TB`
  } else if (gb > 1) {
    return `${Math.floor(gb)}GB`
  } else if (mb > 1) {
    return `${Math.floor(mb)}MB`
  } else if (kb > 1) {
    return `${Math.floor(kb)}KB`
  } else {
    return `0MB`
  }
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
  let etaString =
    estCompleteTimeInMs < 86400000000
      ? getETAStringFromMs(estCompleteTimeInMs)
      : '1000d+'
  const downloadedString = getSizeStringFromBytes(downloadedInBytes)
  let downloadSizeString = getSizeStringFromBytes(downloadSize)

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
        <button
          className={DownloadToastStyles.playDownloadButton}
          onClick={props.onPlayClick}
        >
          <PlayIcon fill="var(--color-success-400)" />
        </button>
      )
    if (status === 'showOnlyCancel') return null
    if (status === 'inProgress')
      return (
        <button
          className={DownloadToastStyles.pauseDownloadButton}
          onClick={props.onPauseClick}
        >
          <PauseIcon fill="var(--color-tertiary-400)" />
        </button>
      )
    if (status === 'paused')
      return (
        <button
          className={DownloadToastStyles.playDownloadButton}
          onClick={props.onStartClick}
        >
          <PlayIcon fill="var(--color-success-400)" />
        </button>
      )
  }
  return (
    <div className={DownloadToastStyles.downloadToastContainer}>
      <div className={DownloadToastStyles.topBar}>
        <div className="title">Downloading</div>
        <button onClick={props.onCloseClick}>
          <CloseButton />
        </button>
      </div>
      <div className={DownloadToastStyles.contentContainer}>
        <div>
          <img src={props.imgUrl} className={DownloadToastStyles.gameImage} />
        </div>
        <div className={DownloadToastStyles.detailsContainer}>
          <div className={`title-sm ${DownloadToastStyles.gameTitle}`}>
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
          <button
            className={DownloadToastStyles.stopDownloadButton}
            onClick={props.onCancelClick}
          >
            <XCircle />
          </button>
        ) : null}
        {getActionButton(props.status)}
      </div>
    </div>
  )
}
