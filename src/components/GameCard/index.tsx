import React, { useState } from 'react'

import FallbackImage from '@/assets/fallback_card.jpg?url'

import * as Images from '../../assets/images'
import styles from './GameCard.module.scss'
import imageStyles from './components/Image/Image.module.css'

type ActionBarProps = {
  title: string
  onSettingsClick: () => void
  onFavoriteClick: () => void
  onActionClick: () => void
  icon: JSX.Element
}

const ActionBar = ({
  title,
  onSettingsClick,
  onFavoriteClick,
  onActionClick,
  icon
}: ActionBarProps) => {
  return (
    <>
      <div className={`${styles.title} title`}>{title}</div>
      <div className={styles.actionButtonContainer}>
        <button style={{ paddingLeft: '0px' }} onClick={onSettingsClick}>
          <Images.Ellipsis fill="var(--color-neutral-100)"></Images.Ellipsis>
        </button>
        <button onClick={onFavoriteClick}>
          <Images.Heart fill="var(--color-neutral-100)"></Images.Heart>
        </button>
        <div className={styles.endActionButtonContainer}>
          <button onClick={onActionClick}>{icon}</button>
        </div>
      </div>
    </>
  )
}

export type GameCardState =
  | 'NOT_SUPPORTED' //grayed out. only title no action bar
  | 'UNINSTALLING' //message
  | 'QUEUED' //action bar with x
  | 'PLAYING' //action bar with cancel/pause buttons
  | 'INSTALLING' //progress bar
  | 'INSTALLED' //action bar with play
  | 'NOT_INSTALLED' //action bar with download
  | 'PAUSED' //progress bar with cancel/play buttons
  | 'SHOW_MESSAGE' //text only

export interface InstallProgress {
  bytes: string
  eta?: string
  folder?: string
  percent?: number
  downSpeed?: number
  diskSpeed?: number
  file?: string
}

type GameCardProps = {
  image?: JSX.Element
  imageUrl?: string
  title: string
  onFavoriteClick: () => void
  onDownloadClick: () => void
  onRemoveFromQueueClick: () => void
  onStopPlayingClick: () => void
  onPlayClick: () => void
  onStopDownloadClick: () => void
  onPauseClick: () => void
  state: GameCardState
  message?: string
  progress?: InstallProgress
}

const GameCard = ({
  image,
  imageUrl,
  title,
  onFavoriteClick,
  onDownloadClick,
  onRemoveFromQueueClick,
  onStopPlayingClick,
  onPlayClick,
  state,
  message,
  progress,
  onStopDownloadClick,
  onPauseClick
}: GameCardProps) => {
  const [showSettings, setShowSettings] = useState(false)

  function getActionBar() {
    const progressBarStyle = {
      '--download-progress-bar-percentage': `${
        progress?.percent ? progress?.percent : 0
      }%`
    } as React.CSSProperties

    switch (state) {
      case 'QUEUED':
        return (
          <ActionBar
            onActionClick={onRemoveFromQueueClick}
            onFavoriteClick={onFavoriteClick}
            onSettingsClick={() => setShowSettings(!showSettings)}
            title={title}
            icon={<Images.BurgerOpenIcon />}
          />
        )
      case 'PLAYING':
        return (
          <ActionBar
            onActionClick={onStopPlayingClick}
            onFavoriteClick={onFavoriteClick}
            onSettingsClick={() => setShowSettings(!showSettings)}
            title={title}
            icon={<Images.BurgerOpenIcon />}
          />
        )
      case 'INSTALLED':
        return (
          <ActionBar
            onActionClick={onPlayClick}
            onFavoriteClick={onFavoriteClick}
            onSettingsClick={() => setShowSettings(!showSettings)}
            title={title}
            icon={<Images.PlayIcon fill="var(--color-neutral-100)" />}
          />
        )
      case 'NOT_INSTALLED':
        return (
          <ActionBar
            onActionClick={onDownloadClick}
            onFavoriteClick={onFavoriteClick}
            onSettingsClick={() => setShowSettings(!showSettings)}
            title={title}
            icon={
              <Images.DownloadIcon fill="var(--color-neutral-100)"></Images.DownloadIcon>
            }
          />
        )
      case 'SHOW_MESSAGE':
        return <div className="caption">{message}</div>
      case 'NOT_SUPPORTED':
        return (
          <>
            <div className={`${styles.title} title-sm`}>{title}</div>
            <div className={styles.actionButtonContainer}>
              <div className="title-sm">Unsupported</div>
            </div>
          </>
        )
      case 'UNINSTALLING':
        return <div className="caption">{'Uninstalling...'}</div>
      case 'INSTALLING':
        return (
          <>
            <div className={styles.downloadProgressContainer}>
              <div className="caption">
                {progress?.percent ? progress?.percent : 0}%
              </div>
              <div
                className={`${styles.progressBar}`}
                style={progressBarStyle}
              ></div>
              <button onClick={onStopDownloadClick}>
                <Images.XCircle></Images.XCircle>
              </button>
              <button onClick={onPauseClick}>
                <Images.PauseIcon fill="var(--color-tertiary-400)"></Images.PauseIcon>
              </button>
            </div>
          </>
        )
      case 'PAUSED':
        return <></>
      default:
        return null
        break
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.border} />
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={imageStyles.proportions}>
            {image || imageUrl ? (
              <img src={imageUrl} />
            ) : (
              <img
                src={FallbackImage}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className={styles.bottomContainer}>{getActionBar()}</div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
