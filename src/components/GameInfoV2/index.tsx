import React, { useEffect, useState } from 'react'

import classNames from 'classnames'

import { DiscordFilled, EditorChoice, Globe, X, Youtube } from '@/assets/images'

import BlockchainsStack from '../BlockchainsStack'
import Button from '../Button'
import MetaSection from '../MetaSection'
import Sticker from '../Sticker'
import styles from './GameInfoV2.module.scss'

interface EditorChoiceType {
  isEditorChoice: boolean
  year?: number
  className?: string
}
export interface GameInfoV2Props {
  title: string
  info: {
    developer?: string
  }
  version?: string
  earlyAccess?: boolean
  playerCount?: string
  ImageComponent?: React.ReactNode
  blockchains?: {
    chainId: string[]
    maxVisible?: number
    showMoreCount?: boolean
  }
  socialLinks?: {
    type: string
    url: string
    className?: string
  }[]
  editorChoice?: EditorChoiceType
  actionButton?: React.ReactNode
  isLoading?: boolean
  className?: string
}

const GameInfoV2: React.FC<GameInfoV2Props> = ({
  title,
  info,
  version,
  earlyAccess,
  playerCount,
  ImageComponent,
  blockchains,
  socialLinks,
  editorChoice,
  actionButton,
  isLoading,
  className
}): JSX.Element => {
  const [isImageLoading, setIsImageLoading] = useState(isLoading)

  useEffect(() => {
    if (ImageComponent && !isImageLoading) {
      setIsImageLoading(false)
    }
    if (!ImageComponent && isImageLoading) {
      setIsImageLoading(true)
    }
  }, [ImageComponent, isImageLoading])

  let editorChoiceElement = null
  if (editorChoice?.isEditorChoice) {
    editorChoiceElement = (
      <div className={classNames(styles.editorChoice, editorChoice.className)}>
        <EditorChoice />
        Editor&apos;s Choice {editorChoice.year || new Date().getFullYear()}
      </div>
    )
  }

  const socialIcons = (socialLink: string) => {
    if (socialLink === 'website') {
      return {
        icon: Globe,
        className: styles.websiteIcon
      }
    }
    if (socialLink === 'twitter') {
      return {
        icon: X,
        className: styles.twitterIcon
      }
    }
    if (socialLink === 'discord') {
      return {
        icon: DiscordFilled,
        className: styles.discordIcon
      }
    }
    if (socialLink === 'youtube') {
      return {
        icon: Youtube,
        className: styles.youtubeIcon
      }
    }
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.imageContainer}>
        {isLoading ? <div className={styles.imageLoading} /> : ImageComponent}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.header}>
            {editorChoiceElement}
            <span className={classNames(styles.title)}>{title}</span>
          </div>

          <div className={styles.info}>
            <div className={styles.badges}>
              <MetaSection
                title=""
                items={[
                  <Sticker key="version" styleType="neutral" variant="outlined">
                    {version}
                  </Sticker>,
                  <Sticker
                    key="earlyAccess"
                    styleType="neutral"
                    variant="outlined"
                  >
                    {earlyAccess ? 'Early Access' : ''}
                  </Sticker>,
                  <Sticker
                    key="developer"
                    styleType="neutral"
                    variant="outlined"
                  >
                    {info.developer}
                  </Sticker>,
                  <Sticker
                    key="playerCount"
                    styleType="neutral"
                    variant="outlined"
                  >
                    {playerCount}
                  </Sticker>
                ]}
                classNames={{}}
                maxVisibleItems={5}
                moreIndicator={<></>}
              />
            </div>
            {blockchains ? (
              <BlockchainsStack
                chainId={blockchains.chainId}
                maxVisible={blockchains.maxVisible}
                showMoreCount={blockchains.showMoreCount}
              />
            ) : null}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            {socialLinks?.map((link, index) => {
              const { icon: Icon } = socialIcons(link.type) ?? {}
              return (
                <Button
                  key={index}
                  type="secondary"
                  size="icon"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  {Icon ? <Icon className={styles.socialIcon} /> : null}
                </Button>
              )
            })}
          </div>

          {actionButton}
        </div>
      </div>
    </div>
  )
}

export default GameInfoV2
