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

interface SocialLink {
  type: string
  url: string
}

interface Blockchain {
  icon: React.ReactNode
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
  socialLinks?: SocialLink[]
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

const GameInfoV2: React.FC<GameInfoV2Props> = ({
  title,
  version,
  earlyAccess,
  playerCount,
  image,
  blockchains = [],
  socialLinks = [],
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
  const renderSocialIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Images.WebIcon />
      case 'twitter':
        return <Images.XLogo />
      case 'discord':
        return <Images.Discord />
      case 'youtube':
        return <Images.Youtube />
      default:
        return null
    }
  }

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

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.imageContainer}>
        {image && (
          <GameImage
            src={image.src}
            alt={image.alt}
            fallback={image.fallback}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.content}>
        {renderEditorChoice()}

        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>

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
        </div>

        {blockchains.length > 0 && (
          <div className={styles.blockchains}>
            BLOCKCHAIN(S):
            <div className={styles.blockchainIcons}>
              {blockchains.map((blockchain, index) => (
                <div key={index} className={styles.blockchainIcon}>
                  {blockchain.icon}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {renderSocialIcon(link.type)}
              </a>
            ))}
          </div>

          {renderLibraryButton()}
        </div>
      </div>
    </div>
  )
}

export default GameInfoV2
