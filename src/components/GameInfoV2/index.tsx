import React from 'react'

import classNames from 'classnames'

import fallbackCard from '@/assets/fallback_card.jpg?url'
import * as Images from '@/assets/images'
import { ReactComponent as LoadingIcon2 } from '@/assets/images/loadingIcon2.svg'

import Button from '../Button'
import Sticker from '../Sticker'
import styles from './GameInfoV2.module.scss'

interface GameImageProps {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  className?: string
}

interface EditorChoiceType {
  isEditorChoice: boolean
  year?: number
  className?: string
}

interface SocialLinks {
  IconButton: React.ElementType
  url: string
}

interface Blockchain {
  icon: React.ElementType
}

interface GameInfoV2i18n {
  title: string
  version: string
  earlyAccess: string
  playerCount: string
  addingText?: string
  notAddedToLibrary?: string
  playText?: string
}

interface BlockchainIconProps {
  Icon: React.ElementType
  className?: string
}

export interface GameInfoV2Props {
  title: string
  version?: string
  earlyAccess?: boolean
  playerCount?: string
  image?: {
    src: string
    alt: string
    fallback?: React.ReactNode
  }
  blockchains?: Blockchain[]
  socialLinks?: SocialLinks[]
  editorChoice?: EditorChoiceType
  onAddToLibraryClick: () => void
  onPlayClick?: () => void
  isAddingToLibrary?: boolean
  isInLibrary?: boolean
  notAddedText?: string
  addingText?: string
  playText?: string
  className?: string
  i18n?: GameInfoV2i18n
}

const GameImage: React.FC<GameImageProps> = ({
  src,
  alt,
  fallback = (
    <img
      src={fallbackCard}
      alt="Game cover fallback"
      className={styles.fallbackImage}
    />
  ),
  className
}) => {
  const [hasError, setHasError] = React.useState(false)

  if (!src || hasError) {
    return fallback ? (
      <div className={classNames(styles.imageFallback, className)}>
        {fallback}
      </div>
    ) : null
  }

  return (
    <img
      src={src}
      alt={alt || 'Game cover'}
      className={classNames(styles.image, className)}
      onError={() => setHasError(true)}
    />
  )
}

const BlockchainIcon: React.FC<BlockchainIconProps> = ({ Icon, className }) => (
  <div className={classNames(styles.blockchainIcon, className)}>
    {React.createElement(Icon, {
      width: '100%',
      height: '100%',
      className: styles.blockchainSvg
    })}
  </div>
)

const GameInfoV2: React.FC<GameInfoV2Props> = ({
  title,
  version,
  earlyAccess,
  playerCount,
  image,
  blockchains = [],
  editorChoice,
  onAddToLibraryClick,
  onPlayClick,
  isAddingToLibrary,
  isInLibrary,
  notAddedText,
  addingText,
  playText,
  i18n,
  className
}) => {
  const renderEditorChoice = () => {
    if (!editorChoice?.isEditorChoice) return null

    return (
      <div className={classNames(styles.editorChoice, editorChoice.className)}>
        <Images.EditorChoice />
        Editor&apos;s Choice {editorChoice.year || new Date().getFullYear()}
      </div>
    )
  }

  const renderLibraryButton = () => {
    if (isAddingToLibrary) {
      return (
        <Button
          type="tertiary"
          size="medium"
          className={styles.addingButton}
          leftIcon={<LoadingIcon2 />}
        >
          {addingText || i18n?.addingText || 'Adding to library...'}
        </Button>
      )
    }

    if (isInLibrary && onPlayClick) {
      return (
        <Button
          onClick={onPlayClick}
          type="secondary"
          size="medium"
          className={styles.playButton}
        >
          {playText || 'Play'}
        </Button>
      )
    }

    return (
      <Button
        onClick={onAddToLibraryClick}
        type="secondary"
        size="medium"
        className={styles.addButton}
        leftIcon={<Images.Plus />}
      >
        {notAddedText || i18n?.notAddedToLibrary || 'Add to library'}
      </Button>
    )
  }

  const renderBlockchains = () => {
    if (blockchains.length === 0) return null

    return (
      <div className={styles.blockchains}>
        <span className={styles.blockchainLabel}>BLOCKCHAIN(S):</span>
        <div className={styles.blockchainIcons}>
          {blockchains.map((blockchain, index) => (
            <BlockchainIcon key={index} Icon={blockchain.icon} />
          ))}
          {blockchains.length > 5 && (
            <div className={styles.moreBlockchains}>
              +{blockchains.length - 5}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.imageContainer}>
        {image ? (
          <GameImage
            src={image.src}
            alt={image.alt}
            fallback={image.fallback}
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.header}>
            {renderEditorChoice()}
            <h1 className={classNames(styles.title, 'title')}>{title}</h1>
          </div>

          <div className={styles.info}>
            <div className={styles.badges}>
              {version && (
                <Sticker styleType="neutral" variant="outlined">
                  Version {version}
                </Sticker>
              )}
              {earlyAccess && (
                <Sticker styleType="neutral" variant="outlined">
                  Early Access
                </Sticker>
              )}
              <Sticker styleType="neutral" variant="outlined">
                {title}
              </Sticker>
              {playerCount && (
                <Sticker styleType="neutral" variant="outlined">
                  {playerCount}
                </Sticker>
              )}
            </div>

            {renderBlockchains()}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            <Button type="secondary" size="icon">
              <Images.WebIcon />
            </Button>
            <Button type="secondary" size="icon">
              <Images.XLogo />
            </Button>
            <Button type="secondary" size="icon">
              <Images.Discord />
            </Button>
            <Button type="secondary" size="icon">
              <Images.Youtube />
            </Button>
          </div>

          {renderLibraryButton()}
        </div>
      </div>
    </div>
  )
}

export default GameInfoV2
