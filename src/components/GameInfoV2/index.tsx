import React from 'react'

import classNames from 'classnames'

import fallbackCard from '@/assets/fallback_card.jpg?url'
import * as Images from '@/assets/images'

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

interface GameInfoV2i18n {
  title: string
  version: string
  earlyAccess: string
  playerCount: string
  addingText?: string
  notAddedToLibrary?: string
  playText?: string
  blockchainLabel?: string
}

interface BlockchainIconProps {
  icon: React.ElementType
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
  blockchains?: Array<{
    icon: React.ElementType
    isHoverable?: boolean
    name?: string
  }>
  showRemainingCount?: boolean
  remainingCount?: string | number
  socialLinks?: SocialLinks[]
  editorChoice?: EditorChoiceType
  actionButton?: React.ReactNode
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

const BlockchainIcon: React.FC<{
  blockchain: BlockchainIconProps
  className?: string
}> = ({ blockchain, className }) => (
  <div className={classNames(styles.blockchainIcon, className)}>
    {React.createElement(blockchain.icon, {
      className: styles.blockchainSvg
    })}
  </div>
)

const MAX_VISIBLE_BLOCKCHAINS = 5

const GameInfoV2: React.FC<GameInfoV2Props> = ({
  title,
  version,
  earlyAccess,
  playerCount,
  image,
  blockchains = [],
  showRemainingCount = true,
  remainingCount = 9,
  socialLinks,
  editorChoice,
  actionButton,
  i18n,
  className
}): JSX.Element => {
  const renderEditorChoice = () => {
    if (!editorChoice?.isEditorChoice) return null

    return (
      <div className={classNames(styles.editorChoice, editorChoice.className)}>
        <Images.EditorChoice />
        Editor&apos;s Choice {editorChoice.year || new Date().getFullYear()}
      </div>
    )
  }

  const renderBlockchains = () => {
    if (!blockchains || blockchains.length === 0) return null

    const visibleBlockchains = blockchains.slice(0, MAX_VISIBLE_BLOCKCHAINS)

    return (
      <div className={styles.blockchains}>
        <span className={styles.blockchainLabel}>
          {i18n?.blockchainLabel || 'BLOCKCHAIN(S):'}
        </span>
        <div className={styles.blockchainIcons}>
          {visibleBlockchains.map((blockchain, index) => (
            <BlockchainIcon key={index} blockchain={blockchain} />
          ))}
          {showRemainingCount && (
            <div className={styles.more}>
              <span className={styles.moreCount}>+{remainingCount}</span>
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
            src={image?.src}
            alt={image?.alt}
            fallback={image?.fallback}
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.header}>
            {renderEditorChoice()}
            <span className={classNames(styles.title)}>{title}</span>
          </div>

          <div className={styles.info}>
            <div className={styles.badges}>
              {version ? (
                <Sticker styleType="neutral" variant="outlined">
                  Version {version}
                </Sticker>
              ) : null}
              {earlyAccess ? (
                <Sticker styleType="neutral" variant="outlined">
                  Early Access
                </Sticker>
              ) : null}
              <Sticker styleType="neutral" variant="outlined">
                {title}
              </Sticker>
              {playerCount ? (
                <Sticker styleType="neutral" variant="outlined">
                  {playerCount}
                </Sticker>
              ) : null}
            </div>

            {renderBlockchains()}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            {socialLinks?.map((link, index) => (
              <Button
                key={index}
                type="secondary"
                size="icon"
                onClick={() => window.open(link.url, '_blank')}
              >
                <link.IconButton className={styles.socialIcon} />
              </Button>
            ))}
          </div>

          {actionButton}
        </div>
      </div>
    </div>
  )
}

export default GameInfoV2
