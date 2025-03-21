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
    expanded?: boolean
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
  i18n?: {
    showMore: string
    showLess: string
  }
}

const GameAbout = ({
  titleSmall,
  titleLarge,
  description,
  gameName,
  sticker,
  classnames,
  buttonLink,
  i18n
}: GameAboutProps) => {
  const aboutText = useRef<HTMLParagraphElement | null>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [expanded, setExpanded] = useState(buttonLink?.expanded || false)

  useEffect(() => {
    if (aboutText && aboutText.current) {
      const element = aboutText.current
      const hasOverflow = element.scrollHeight > element.clientHeight
      setIsClamped(hasOverflow || expanded)
    }
  }, [description, expanded])

  const handleShowMore = () => {
    setExpanded(!expanded)
    if (buttonLink?.onClick) {
      buttonLink.onClick()
    }
  }

  return (
    <div className={classNames(styles.container, classnames?.container)}>
      {titleSmall ? (
        <div className={classNames('title-sm', classnames?.titleSmall)}>
          {titleSmall}
        </div>
      ) : null}
      {titleLarge ? (
        <div className={classNames('title', classnames?.titleLarge)}>
          {titleLarge}
        </div>
      ) : null}

      {gameName ? (
        <div className={classNames('title', classnames?.gameTitle)}>
          {gameName}
        </div>
      ) : null}
      {sticker ? (
        sticker.length > 0 ? (
          <div className={classNames(styles.stickers)}>
            {sticker.map((item, index) => (
              <Sticker
                key={index}
                styleType={
                  item.label === 'Access Gated' ? 'warning' : 'tertiary'
                }
                withIcon={item.withIcon}
                variant="outlined"
              >
                {item.label}
              </Sticker>
            ))}
          </div>
        ) : null
      ) : null}

      <p
        ref={aboutText}
        className={classNames(
          'body-sm',
          styles.description,
          expanded ? styles.expandedText : styles.clampedText,
          classnames?.description
        )}
      >
        {description}
      </p>
      {isClamped ? (
        <Button
          className={classNames('button-sm', styles.showMore)}
          onClick={handleShowMore}
          type="link"
          data-testid="show-more-button"
        >
          {expanded ? (
            <>
              {i18n?.showLess || 'Show less'}{' '}
              <Images.DownArrow className={styles.iconOpen} />
            </>
          ) : (
            <>
              {i18n?.showMore || 'Show more'} <Images.DownArrow />
            </>
          )}
        </Button>
      ) : null}
    </div>
  )
}

export default GameAbout
