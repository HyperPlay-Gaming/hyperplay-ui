import React, { useEffect, useState } from 'react'

import classNames from 'classnames'

import { EditorChoice } from '@/assets/images'

import MetaSection from '../MetaSection'
import SocialLinks from '../SocialLinks/SocialLinks'
import Sticker from '../Sticker'
import styles from './GameInfoV2.module.scss'
import { bytesUnits, parseNumIntoReadableString } from '@hyperplay/utils'

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
  downloadSizeInBytes?: string
  ImageComponent?: React.ReactNode
  blockchains?: React.ReactNode
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
  downloadSizeInBytes,
  ImageComponent,
  blockchains,
  socialLinks,
  editorChoice,
  actionButton,
  isLoading,
  className,
  i18n = {
    editorChoice: "Editor's Choice",
    version: 'Version',
    earlyAccess: 'Early Access',
    developer: 'Developer',
    playerCount: 'Player Count'
  }
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
        {`${i18n.editorChoice} `}{' '}
        {editorChoice.year || new Date().getFullYear()}
      </div>
    )
  }

  let downloadSizeReadable = null
  if (downloadSizeInBytes) {
    downloadSizeReadable = parseNumIntoReadableString({
      num: downloadSizeInBytes,
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '1'
    })
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
                  version ? (
                    <Sticker
                      key={i18n.version}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {version}
                    </Sticker>
                  ) : null,
                  earlyAccess ? (
                    <Sticker
                      key={i18n.earlyAccess}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {i18n.earlyAccess}
                    </Sticker>
                  ) : null,
                  info.developer ? (
                    <Sticker
                      key={i18n.developer}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {info.developer}
                    </Sticker>
                  ) : null,
                  playerCount ? (
                    <Sticker
                      key={i18n.playerCount}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {playerCount}
                    </Sticker>
                  ) : null,
                  downloadSizeReadable ? (
                    <Sticker
                      key={'download-size-sticker'}
                      styleType="neutral"
                      variant="filledStrong"
                    >
                      {downloadSizeReadable}
                    </Sticker>
                  ) : null
                ]}
                maxVisibleItems={8}
                moreIndicator={<></>}
              />
            </div>
            {blockchains}
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
