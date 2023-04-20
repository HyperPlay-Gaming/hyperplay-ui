import React from 'react'

import { faPause, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
}

export default function DownloadToast(props: DownloadToastType) {
  const percentCompleted = Math.round(
    (props.downloadedInBytes / props.downloadSizeInBytes) * 100
  )
  return (
    <div className={DownloadToastStyles.downloadToastContainer}>
      <div className={DownloadToastStyles.topBar}>
        <div className="title">Downloading</div>
        <button onClick={props.onCloseClick}>
          <FontAwesomeIcon icon={faX} />
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
            <div className="eyebrow">
              {props.downloadedInBytes}/{props.downloadSizeInBytes}
            </div>
            <div className="eyebrow">
              ETA: {props.estimatedCompletionTimeInMs}
            </div>
          </div>
          <div className={DownloadToastStyles.progressBar}>
            <div
              className={DownloadToastStyles.progress}
              style={{ width: percentCompleted }}
            ></div>
            <div className={`menu ${DownloadToastStyles.percentCompletedText}`}>
              {percentCompleted}%
            </div>
          </div>
        </div>
      </div>
      <div className={DownloadToastStyles.manageDownloadContainer}>
        <button className={DownloadToastStyles.stopDownloadButton}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
        <button className={DownloadToastStyles.pauseDownloadButton}>
          <FontAwesomeIcon icon={faPause} />
        </button>
      </div>
    </div>
  )
}
