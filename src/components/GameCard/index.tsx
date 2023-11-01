import React, { HTMLAttributes, PropsWithChildren } from 'react'

import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import FallbackImage from '@/assets/fallback_card.jpg?url'
import { CheckmarkCircleOutline, PlusCircleOutline } from '@/assets/images'

import * as Images from '../../assets/images'
import styles from './GameCard.module.scss'
import ActionBar from './components/ActionBar'
import DownloadBar from './components/DownloadBar'
import imageStyles from './components/Image/Image.module.css'
import {
  GameCardState,
  InstallProgress,
  Runner,
  SettingsButtons
} from './types'

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
  store?: Runner
  app?: 'client' | 'store' | 'storeInClient'
  onAddToLibraryClick?: React.MouseEventHandler<HTMLButtonElement>
  onRemoveFromLibraryClick?: React.MouseEventHandler<HTMLButtonElement>
  gameIsAddedToLibrary?: boolean
  notAddedText?: string
  addedText?: string
  enableRemoveButton?: boolean
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
  app = 'client',
  onAddToLibraryClick,
  onRemoveFromLibraryClick,
  gameIsAddedToLibrary,
  notAddedText,
  addedText,
  enableRemoveButton,
  ...props
}: GameCardProps) => {
  const [showPopover, { open, close }] = useDisclosure(false)

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
            icon={<Images.BurgerOpenIcon width="22px" height="22px" />}
          />
        )
      case 'PLAYING':
        return (
          <ActionBar
            {...actionBarProps}
            onActionClick={onStopPlayingClick}
            icon={<Images.BurgerOpenIcon width="22px" height="22px" />}
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
      case 'EXTRACTING':
        return (
          <>
            <DownloadBar
              message={message}
              progress={progress}
              onStopDownloadClick={onStopDownloadClick}
              onPauseClick={onPauseClick}
              onResumeClick={onResumeClick}
              isPaused={false}
              hasProgressControls={false}
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
      case 'hyperplay':
        return <Images.HyperPlayStoreLogo />
      case 'gog':
        return <Images.GogStoreLogo />
      case 'legendary':
        return <Images.EpicStoreLogo />
      case 'nile':
        return <Images.AmazonLogo />
      default:
        return null
    }
  }

  function getStoreButton() {
    const pos = 'top'
    const offset = { mainAxis: 0 }
    if (!gameIsAddedToLibrary && onAddToLibraryClick !== undefined)
      return (
        <Popover
          position={pos}
          shadow="md"
          opened={showPopover}
          offset={offset}
        >
          <Popover.Target>
            <button
              onClick={onAddToLibraryClick}
              className={styles.storeActionButton}
              onMouseEnter={open}
              onMouseLeave={close}
            >
              <PlusCircleOutline />
            </button>
          </Popover.Target>
          <Popover.Dropdown className={styles.popover}>
            <div className="caption-sm">
              {notAddedText ? notAddedText : `Add to library`}
            </div>
          </Popover.Dropdown>
        </Popover>
      )

    if (onRemoveFromLibraryClick !== undefined)
      return (
        <Popover
          position={pos}
          shadow="md"
          opened={showPopover}
          offset={offset}
        >
          <Popover.Target>
            <button
              onClick={
                enableRemoveButton
                  ? onRemoveFromLibraryClick
                  : () => {
                      console.log('remove button disabled')
                    }
              }
              className={styles.storeActionButton}
              onMouseEnter={open}
              onMouseLeave={close}
              style={!enableRemoveButton ? { opacity: '100%' } : {}}
            >
              <CheckmarkCircleOutline />
            </button>
          </Popover.Target>
          <Popover.Dropdown className={styles.popover}>
            <div className="caption-sm">
              {addedText ? addedText : `Remove from library`}
            </div>
          </Popover.Dropdown>
        </Popover>
      )

    return null
  }

  const grayscaleFilterClassName =
    !alwaysShowInColor &&
    (state === 'NOT_INSTALLED' || state === 'NOT_SUPPORTED')
      ? styles.grayscaleFilter
      : ''
  return (
    <div className={styles.root} {...props}>
      <div className={styles.border} />
      <div className={`${styles.card}`}>
        {showSettings ? (
          <div className={styles.settingsMenu}>{getSettingsItems()}</div>
        ) : null}
        <div className={styles.content}>
          <div
            className={`${imageStyles.proportions} ${grayscaleFilterClassName}`}
          >
            {image ? (
              image
            ) : imageUrl ? (
              <img src={imageUrl} />
            ) : (
              <img
                src={FallbackImage}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className={styles.bottomContainer}>
            {app === 'client' ? (
              getActionBar()
            ) : (
              <div
                className={`${styles.storeTitle} title`}
                data-testid="game-title"
              >
                {title}
              </div>
            )}
          </div>

          <div className={styles.storeLogoContainer}>
            {app === 'storeInClient'
              ? getStoreButton()
              : app === 'client' && store
              ? getStoreLogo()
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
