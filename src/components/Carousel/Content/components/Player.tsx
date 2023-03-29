import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import PlayerFactory from 'youtube-player'

import styles from '../ContentCarousel.module.scss'

interface PlayerProps {
  videoId: string
  width: number
  height: number
  onPlay?: () => void
  onPause?: () => void
}

const Player = ({ videoId, width, height, onPlay, onPause }: PlayerProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const playerApiRef = useRef<ReturnType<typeof PlayerFactory>>()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!playerRef.current) return

    const player = PlayerFactory(playerRef.current, {
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1
      }
    })

    player.on('stateChange', (state) => {
      setIsPlaying(state.data === 1)
    })

    playerApiRef.current = player
    return () => {
      // NextJS instantaneously executes the destroy method o.O
      // player.destroy()
    }
  }, [])

  useEffect(() => {
    console.log(isPlaying)

    if (isPlaying) {
      onPlay?.()
    } else {
      onPause?.()
    }
  }, [isPlaying])

  return (
    <div
      className={styles.expand}
      style={{
        width,
        height
      }}
    >
      <div
        className={classNames(styles.videoOverlay, {
          [styles.isPlaying]: isPlaying
        })}
        ref={overlayRef}
        onClick={() => {
          playerApiRef.current?.playVideo()
        }}
        style={{
          height: '100%',
          width: '100%'
        }}
      />
      <div ref={playerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Player
