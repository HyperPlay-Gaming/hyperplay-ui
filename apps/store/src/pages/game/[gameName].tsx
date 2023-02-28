import React from 'react'
import BackButton from '@/components/BackButton'
import { Background, ContentCarousel, GameInfo } from '@hyperplay/ui'
import { useRouter } from 'next/router'

import styles from '@/styles/Game.module.scss'
import { getMediaFromRelease } from '@/helpers/game/getMediaFromRelease'
import parseMedia from '@/helpers/game/parseMedia'
import { Release } from '@/api/games.types'
import { GetStaticProps } from 'next'
import { getGames } from '@/api/games'
import classNames from 'classnames'

export interface Video {
  thumbnailElement: JSX.Element
  youtubeId: string
}

interface GameProps {
  id: string
  title: string
  description: string
  media: ReturnType<typeof getMediaFromRelease>
  info: Record<string, string>
  platforms: {
    linux: boolean
    mac: boolean
    windows: boolean
  }
}

const Game = ({
  id,
  title,
  description,
  media,
  info,
  platforms
}: GameProps) => {
  const router = useRouter()

  const parsedMedia = parseMedia(media)

  const onActionClick = () => {
    //@ts-ignore
    window.api && window.api.install(id)
  }
  return (
    <div className="main">
      <div className="content">
        <BackButton />
        <div className={styles.contentLayout}>
          <div className={styles.content}>
            <div className={styles.carouselWrapper}>
              <ContentCarousel items={parsedMedia} />
            </div>
            <div className={styles.description}>
              <div className={classNames('eyebrow', styles.contentTitle)}>
                About
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.info}>
            <GameInfo
              store="hyperplay"
              title={title}
              info={info}
              platforms={platforms}
              onActionClick={onActionClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game

export const getStaticProps: GetStaticProps = async (context) => {
  const games = await getGames({})
  const game = games.find(
    (game) => game.projectName === context.params?.gameName
  ) as Release

  const media = getMediaFromRelease(game)

  return {
    props: {
      id: game._id,
      title: game.projectMeta.name,
      description: game.projectMeta.description,
      media,
      info: {
        Developer: game.accountName,
        Version: game.releaseName,
        Genre: game.projectMeta.tags.join(', ')
      },
      platforms: {
        windows: Object.keys(game.releaseMeta.platforms).some((platform) =>
          platform.includes('windows')
        ),
        linux: Object.keys(game.releaseMeta.platforms).some((platform) =>
          platform.includes('linux')
        ),
        mac: Object.keys(game.releaseMeta.platforms).some((platform) =>
          platform.includes('darwin')
        )
      }
    }
  }
}

export async function getStaticPaths() {
  // if (process.env.SKIP_STATIC_GENERATION) {
  return {
    paths: [],
    fallback: 'blocking'
  }
  // }

  // const games = await getGames({})

  // return {
  //   paths: games.map((game) => `/game/${game.projectName}`),
  //   fallback: true
  // }
}

export const revalidate = 60 * 5
