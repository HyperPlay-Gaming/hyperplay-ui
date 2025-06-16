import React from 'react'

import { getETAStringFromMs } from '@hyperplay/utils'

import { CloseButton } from '@/assets/images'
import Button from '@/components/Button'

import DownloadToastStyles from './index.module.scss'
import { size } from './utils'

export interface DownloadToastI18nProp {
  play: string
  pause: string
  resume: string
  cancel: string
  downloading: string
  of: string
}

export const defaultI18n: DownloadToastI18nProp = {
  play: 'Play',
  pause: 'Pause',
  resume: 'Resume',
  cancel: 'Cancel',
  downloading: 'Downloading',
  of: 'of'
}

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
  i18n?: DownloadToastI18nProp
}

export default function DownloadToast(props: DownloadToastType) {
  const i18n = { ...defaultI18n, ...props.i18n }

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
          <span>{i18n.play}</span>
        </Button>
      )
    if (status === 'showOnlyCancel') return null
    if (status === 'inExtraction') return null
    if (status === 'inProgress')
      return (
        <Button type="primary" size="small" onClick={props.onPauseClick}>
          <span>{i18n.pause}</span>
        </Button>
      )
    if (status === 'paused')
      return (
        <Button type="primary" size="small" onClick={props.onStartClick}>
          <span>{i18n.resume}</span>
        </Button>
      )
  }
  return (
    <div className={DownloadToastStyles.downloadToastContainer}>
      <div className={DownloadToastStyles.topBar}>
        <div className="title">{props.statusText ?? i18n.downloading}</div>
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
          <div className={`eyebrow ${DownloadToastStyles.gameTitle}`}>
            {props.gameTitle}
            <div
              className={`eyebrow ${DownloadToastStyles.percentCompletedText}`}
            >
              {percentCompletedStr}%
            </div>
          </div>

          <div
            className={DownloadToastStyles.progressBar}
            style={progressBarStyle}
          ></div>
          <div className={DownloadToastStyles.statusContainer}>
            <div className="caption-sm">ETA: {etaString}</div>
            <div className={DownloadToastStyles.downloadNumberContainer}>
              <div className="caption-sm">{downloadedString}</div>
              <div className="caption-sm">{` ${i18n.of} `}</div>
              <div className="caption-sm">{`${downloadSizeString}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={DownloadToastStyles.manageDownloadContainer}>
        {props.status !== 'done' ? (
          <Button type="tertiary" size="small" onClick={props.onCancelClick}>
            <span>{i18n.cancel}</span>
          </Button>
        ) : null}
        {getActionButton(props.status)}
      </div>
    </div>
  )
}
