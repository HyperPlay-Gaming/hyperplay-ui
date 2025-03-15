import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import * as Images from '@/assets/images'
import Button from '@/components/Button'

import Sticker from '../Sticker'
import styles from './GameAbout.module.scss'

export interface GameAboutProps {
  titleSmall?: string
  titleLarge?: string
  description: string
  gameName?: string
  sticker?: {
    label: string
    withIcon?: React.ReactNode
  }[]
  buttonLink?: {
    onClick?: () => void
  }
  classnames?: {
    container?: string
    titleSmall?: string
    titleLarge?: string
    gameTitle?: string
    description?: string
    buttonLink?: string
  }
}

const GameAbout = ({
  titleSmall,
  titleLarge,
  description,
  gameName,
  sticker,
  classnames,
  buttonLink
}: GameAboutProps) => {
  const aboutText = useRef<HTMLParagraphElement | null>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (aboutText && aboutText.current) {
      const { clientHeight, scrollHeight } = aboutText.current
      setIsClamped(scrollHeight > clientHeight)
    }
  }, [])

  const handleShowMore = () => {
    setExpanded(!expanded)
    if (buttonLink?.onClick) {
      buttonLink.onClick()
    }
  }

  return (
    <div className={classNames(styles.container, classnames?.container)}>
      {titleSmall && (
        <div className={classNames('text-sm', classnames?.titleSmall)}>
          {titleSmall}
        </div>
      )}
      {titleLarge && (
        <div className={classNames('title', classnames?.titleLarge)}>
          {titleLarge}
        </div>
      )}

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
      {sticker && sticker.length > 0 && (
        <div className={classNames(styles.stickers)}>
          {sticker.map((item, index) => (
            <Sticker
              key={index}
              styleType={item.label === 'Access Gated' ? 'warning' : 'tertiary'}
              variant="outlined"
              withIcon={item.withIcon}
            >
              {item.label}
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
          onClick={handleShowMore}
          type="link"
        >
          {expanded ? (
            <>
              Show less <Images.DownArrow className={styles.iconOpen} />
            </>
          ) : (
            <>
              Show more <Images.DownArrow />
            </>
          )}
        </Button>
      )}
    </div>
  )
}

export default GameAbout
