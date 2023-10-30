import React from 'react'

import * as Images from '../../../../assets/images'
import styles from '../../GameCard.module.scss'
import { InstallProgress } from '../../types'

type DownloadBarProps = {
  onStopDownloadClick: React.MouseEventHandler<HTMLButtonElement>
  onPauseClick: React.MouseEventHandler<HTMLButtonElement>
  onResumeClick: React.MouseEventHandler<HTMLButtonElement>
  message?: string
  progress?: InstallProgress
  isPaused?: boolean
  hasProgressControls?: boolean;
}

const DownloadBar = ({
  message,
  progress,
  onStopDownloadClick,
  onPauseClick,
  onResumeClick,
  isPaused,
  hasProgressControls = true
}: DownloadBarProps) => {
  const progressBarStyle = {
    '--download-progress-bar-percentage': `${
      progress?.percent ? progress?.percent : 0
    }%`
  } as React.CSSProperties

  return (
    <>
      <div className="caption">{message}</div>
      <div
        className={`${styles.downloadProgressContainer} ${
          isPaused ? styles.paused : ''
        }`}
      >
        <div className="caption">
          {progress?.percent ? Math.round(progress?.percent) : 0}%
        </div>
        <div className={`${styles.progressBar}`} style={progressBarStyle}></div>
        <button onClick={onStopDownloadClick}>
          <Images.XCircle></Images.XCircle>
        </button>
        {
          hasProgressControls && (
            <button onClick={isPaused ? onResumeClick : onPauseClick}>
              {isPaused ? (
                <Images.Resume fill="var(--color-tertiary-400)"></Images.Resume>
              ) : (
                <Images.PauseIcon fill="var(--color-tertiary-400)"></Images.PauseIcon>
              )}
            </button>
          )
        }
      </div>
    </>
  )
}

export default DownloadBar
