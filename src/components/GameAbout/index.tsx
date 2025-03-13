import React, { useEffect, useRef, useState } from 'react'

import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react'
import classNames from 'classnames'

import * as Images from '@/assets/images'
import Button from '@/components/Button'

import Sticker from '../Sticker'
import styles from './GameAbout.module.scss'

export interface GameAboutProps {
  description: string
  gameName?: string
  stickers?: Array<{
    icon: string
    label: string
  }>
  buttonLink?: {
    label: string
    onClick: () => void
  }
  classnames?: {
    container?: string
    title?: string
    description?: string
    gameTitle?: string
    button?: string
    stickers?: string
  }
}

const GameAbout = ({
  description,
  gameName,
  stickers,
  classnames
}: GameAboutProps) => {
  const aboutText = useRef<HTMLParagraphElement | null>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (aboutText && aboutText.current) {
      const { clientHeight, scrollHeight } = aboutText.current
      console.log({ clientHeight, scrollHeight })
      setIsClamped(scrollHeight > clientHeight)
    }
  }, [])

  return (
    <div className={classnames?.container}>
      {gameName && (
        <div
          className={classNames(
            'header',
            styles.gameTitle,
            classnames?.gameTitle
          )}
        >
          {gameName}
        </div>
      )}
      <div className={classNames('caption', classnames?.title)}>About</div>
      {stickers && stickers.length > 0 && (
        <div className={classNames(styles.stickers, classnames?.stickers)}>
          {stickers.map((sticker, index) => (
            <Sticker
              key={index}
              styleType={
                sticker.label === 'Access Gated' ? 'warning' : 'tertiary'
              }
              variant="outlined"
            >
              <div className={styles.stickerContent}>
                {sticker.label === 'Access Gated' ? (
                  <IconAlertTriangle className={styles.iconBadge} />
                ) : (
                  <IconInfoCircle className={styles.iconBadge} />
                )}
                <span>{sticker.label}</span>
              </div>
            </Sticker>
          ))}
        </div>
      )}
      <p
        ref={aboutText}
        className={classNames(
          'body-sm',
          styles.description,
          !expanded && styles.clampedText,
          classnames?.description
        )}
      >
        {description}
      </p>
      {isClamped && (
        <Button
          className={classNames('button-sm', styles.showMore)}
          onClick={() => setExpanded(!expanded)}
          type="link"
        >
          {expanded ? (
            <>
              Show less <Images.DownArrow className={styles.iconOpen} />
            </>
          ) : (
            <>
              Show more <Images.DownArrow className={styles.iconOpen} />
            </>
          )}
        </Button>
      )}
    </div>
  )
}

export default GameAbout
