import React from 'react'

import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CloseButton, PauseIcon, XCircle } from '@/assets/images'

import DownloadToastStyles from './index.module.scss'

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

export type downloadStatus = 'inProgress' | 'paused'

export default function DownloadToast(props: DownloadToastType) {
  // check that percent completed <= 100
  let percentCompleted = Math.round(
    (props.downloadedInBytes / props.downloadSizeInBytes) * 100
  )
  if (percentCompleted > 100) percentCompleted = 100

  // check download size isn't smaller than what has already been downloaded
  let downloadSize = props.downloadSizeInBytes
  if (props.downloadSizeInBytes < props.downloadedInBytes) {
    console.error(
      'Download size passed to Download Toast was smaller than already downloaded bytes!'
    )
    downloadSize = props.downloadedInBytes
  }

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

  if (downloadSize < 0) {
    console.error('Download size was negative!')
    downloadSize = 0
  }

  // prevent string from being too long
  const etaString =
    estCompleteTimeInMs < 86400000000
      ? getETAStringFromMs(estCompleteTimeInMs)
      : '1000d+'
  const downloadedString = getSizeStringFromBytes(downloadedInBytes)
  const downloadSizeString = getSizeStringFromBytes(downloadSize)

  const progressBarStyle = {
    '--download-progress-bar-percentage': `${percentCompleted}%`
  } as React.CSSProperties
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
              {percentCompleted}%
            </div>
          </div>
        </div>
      </div>
      <div className={DownloadToastStyles.manageDownloadContainer}>
        <button
          className={DownloadToastStyles.stopDownloadButton}
          onClick={props.onCancelClick}
        >
          <XCircle />
        </button>
        {props.status === 'inProgress' ? (
          <button
            className={DownloadToastStyles.pauseDownloadButton}
            onClick={props.onPauseClick}
          >
            <PauseIcon />
          </button>
        ) : (
          <button
            className={DownloadToastStyles.pauseDownloadButton}
            onClick={props.onStartClick}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  )
}
