import React, { HTMLAttributes, PropsWithChildren } from 'react'

import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FallbackImage from '@/assets/fallback_card.jpg?url'

import * as Images from '../../assets/images'
import styles from './GameCard.module.scss'
import ActionBar from './components/ActionBar'
import DownloadBar from './components/DownloadBar'
import imageStyles from './components/Image/Image.module.css'
import { GameCardState, InstallProgress, SettingsButtons } from './types'

export interface GameCardProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  image?: JSX.Element
  imageUrl?: string
  title: string
  onFavoriteClick: React.MouseEventHandler<HTMLButtonElement>
  onDownloadClick: React.MouseEventHandler<HTMLButtonElement>
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>
  onRemoveFromQueueClick: React.MouseEventHandler<HTMLButtonElement>
  onStopPlayingClick: React.MouseEventHandler<HTMLButtonElement>
  onPlayClick: React.MouseEventHandler<HTMLButtonElement>
  onStopDownloadClick: React.MouseEventHandler<HTMLButtonElement>
  onPauseClick: React.MouseEventHandler<HTMLButtonElement>
  onResumeClick: React.MouseEventHandler<HTMLButtonElement>
  state: GameCardState
  message?: string
  progress?: InstallProgress
  favorited?: boolean
  settingsItems: SettingsButtons[]
  showSettings: boolean
  onSettingsClick: React.MouseEventHandler<HTMLButtonElement>
  actionDisabled?: boolean
  alwaysShowInColor?: boolean
  store?: 'HYPERPLAY' | 'EPIC' | 'GOG'
}

const GameCard = ({
  image,
  imageUrl,
  title,
  onFavoriteClick,
  onDownloadClick,
  onUpdateClick,
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
  showSettings,
  onSettingsClick,
  onResumeClick,
  actionDisabled = false,
  alwaysShowInColor = false,
  store,
  ...props
}: GameCardProps) => {
  function getActionBar() {
    const actionBarProps = {
      onFavoriteClick: onFavoriteClick,
      onSettingsClick: onSettingsClick,
      title: title,
      favorited: favorited,
      showSettings: showSettings,
      actionDisabled: actionDisabled
    }
    switch (state) {
      case 'QUEUED':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onRemoveFromQueueClick}
            icon={<Images.BurgerOpenIcon />}
          />
        )
      case 'PLAYING':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onStopPlayingClick}
            icon={<Images.BurgerOpenIcon />}
          />
        )
      case 'INSTALLED':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onPlayClick}
            icon={<Images.PlayIcon fill="var(--color-neutral-100)" />}
          />
        )
      case 'NOT_INSTALLED':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onDownloadClick}
            icon={
              <Images.DownloadIcon fill="var(--color-neutral-100)"></Images.DownloadIcon>
            }
            actionDisabled={actionDisabled}
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
              onResumeClick={onResumeClick}
              isPaused={false}
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
              onResumeClick={onResumeClick}
              isPaused={true}
            />
          </>
        )
      case 'NEEDS_UPDATE':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onUpdateClick}
            icon={
              <FontAwesomeIcon
                size={'2x'}
                fill="var(--color-neutral-100)"
                icon={faRepeat}
              />
            }
          />
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

  function getStoreLogo() {
    switch (store) {
      case 'HYPERPLAY':
        return <Images.HyperPlayStoreLogo />
      case 'GOG':
        return <Images.GogStoreLogo />
      case 'EPIC':
        return <Images.EpicStoreLogo />
      default:
        return null
    }
  }

  return (
    <div className={styles.root} {...props}>
      <div className={styles.border} />
      <div
        className={`${styles.card} ${
          !alwaysShowInColor &&
          (state === 'NOT_INSTALLED' || state === 'NOT_SUPPORTED')
            ? styles.grayscaleFilter
            : ''
        }`}
      >
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
          {store ? (
            <div className={styles.storeLogoContainer}>{getStoreLogo()}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GameCard
