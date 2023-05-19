import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'

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
  favorited?: boolean
}

const ActionBar = ({
  title,
  onSettingsClick,
  onFavoriteClick,
  onActionClick,
  icon,
  favorited
}: ActionBarProps) => {
  return (
    <>
      <div className={`${styles.title} title`}>{title}</div>
      <div className={styles.actionButtonContainer}>
        <button style={{ paddingLeft: '0px' }} onClick={onSettingsClick}>
          <Images.Ellipsis fill="var(--color-neutral-100)"></Images.Ellipsis>
        </button>
        <button onClick={onFavoriteClick}>
          <Images.Heart
            fill={
              favorited
                ? 'var(--color-primary-400)'
                : 'var(--color-neutral-100)'
            }
          ></Images.Heart>
        </button>
        <div className={styles.endActionButtonContainer}>
          <button onClick={onActionClick}>{icon}</button>
        </div>
      </div>
    </>
  )
}

type DownloadBarProps = {
  onStopDownloadClick: () => void
  onPauseClick: () => void
  message?: string
  progress?: InstallProgress
  isPaused?: boolean
}

const DownloadBar = ({
  message,
  progress,
  onStopDownloadClick,
  onPauseClick,
  isPaused
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
          {progress?.percent ? progress?.percent : 0}%
        </div>
        <div className={`${styles.progressBar}`} style={progressBarStyle}></div>
        <button onClick={onStopDownloadClick}>
          <Images.XCircle></Images.XCircle>
        </button>
        <button onClick={onPauseClick}>
          {isPaused ? (
            <Images.Resume fill="var(--color-tertiary-400)"></Images.Resume>
          ) : (
            <Images.PauseIcon fill="var(--color-tertiary-400)"></Images.PauseIcon>
          )}
        </button>
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

export type SettingsButtons = {
  label: string
  onClick: () => void
}

export interface GameCardProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
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
  favorited?: boolean
  settingsItems: SettingsButtons[]
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
  onPauseClick,
  favorited,
  settingsItems,
  ...props
}: GameCardProps) => {
  const [showSettings, setShowSettings] = useState(false)

  function getActionBar() {
    switch (state) {
      case 'QUEUED':
        return (
          <ActionBar
            onActionClick={onRemoveFromQueueClick}
            onFavoriteClick={onFavoriteClick}
            onSettingsClick={() => setShowSettings(!showSettings)}
            title={title}
            icon={<Images.BurgerOpenIcon />}
            favorited={favorited}
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
            favorited={favorited}
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
            favorited={favorited}
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
            favorited={favorited}
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
            <DownloadBar
              message={message}
              progress={progress}
              onStopDownloadClick={onStopDownloadClick}
              onPauseClick={onPauseClick}
            />
          </>
        )
      case 'PAUSED':
        return (
          <>
            <DownloadBar
              message={message}
              progress={progress}
              onStopDownloadClick={onStopDownloadClick}
              onPauseClick={onPauseClick}
              isPaused={true}
            />
          </>
        )
      default:
        return null
        break
    }
  }

  function getSettingsItems() {
    const items = []
    for (const item of settingsItems) {
      items.push(
        <button className="button-sm" key={item.label} onClick={item.onClick}>
          {item.label}
        </button>
      )
    }
    return items
  }

  return (
    <div className={styles.root} {...props}>
      <div className={styles.border} />
      <div className={styles.card}>
        {showSettings ? (
          <div className={styles.settingsMenu}>{getSettingsItems()}</div>
        ) : null}
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
