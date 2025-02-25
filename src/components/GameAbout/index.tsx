import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import * as Images from '@/assets/images'

import styles from './GameAbout.module.scss'

export interface GameAboutProps {
  description: string
  gameName?: string
  classnames?: {
    container?: string
    title?: string
    description?: string
    gameTitle?: string
  }
}

const GameAbout = ({ description, gameName, classnames }: GameAboutProps) => {
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
        <button
          className={classNames('body-sm', styles.readMore)}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              Read less <Images.DownArrow className={styles.iconOpen} />
            </>
          ) : (
            <>
              Read more <Images.DownArrow />
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default GameAbout
