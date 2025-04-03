import React, { useEffect, useState } from 'react'

import classNames from 'classnames'

import { EditorChoice } from '@/assets/images'

import BlockchainsStack from '../BlockchainsStack'
import MetaSection from '../MetaSection'
import SocialLinks from '../SocialLinks/SocialLinks'
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
  i18n?: {
    editorChoice?: string
    earlyAccess?: string
    developer?: string
    playerCount?: string
    version?: string
  }
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
  className,
  i18n
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
        {i18n?.editorChoice || "Editor's Choice"}{' '}
        {editorChoice.year || new Date().getFullYear()}
      </div>
    )
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
                  <Sticker
                    key={i18n?.version || 'Version'}
                    styleType="neutral"
                    variant="filledStrong"
                  >
                    {version}
                  </Sticker>,
                  earlyAccess ? (
                    <Sticker
                      key={i18n?.earlyAccess || 'Early Access'}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {earlyAccess ? 'Early Access' : ''}
                    </Sticker>
                  ) : null,
                  <Sticker
                    key={i18n?.developer || 'Developer'}
                    styleType="neutral"
                    variant="filledStrong"
                  >
                    {info.developer}
                  </Sticker>,
                  playerCount ? (
                    <Sticker
                      key={i18n?.playerCount || 'Player Count'}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {playerCount}
                    </Sticker>
                  ) : null
                ]}
                classNames={{}}
                maxVisibleItems={8}
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
          {socialLinks && <SocialLinks socialLinks={socialLinks} />}
          {actionButton}
        </div>
      </div>
    </div>
  )
}

export default GameInfoV2
