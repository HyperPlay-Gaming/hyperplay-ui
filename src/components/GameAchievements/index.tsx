import React, { HTMLProps, useState } from 'react'

import { Image } from '@mantine/core'
import cn from 'classnames'

import * as Images from '@/assets/images'

import AchievementProgress from '../AchievementProgress'
import ProgressKey from '../AchievementProgress/components/ProgressKey'
import getProgress from '../AchievementProgress/helpers/getProgress'
import CircularButton from '../CircularButton'
import { Dropdown } from '../Dropdowns'
import styles from './GameAchievements.module.scss'
import Basket from './components/Basket'

export interface GameAchievementsProps extends HTMLProps<HTMLDivElement> {
  freeMints: number
  basketAmount: number
  game: { title: string; tags: string[] }
  achievements: {
    id: string
    title: string
    description: string
    image: string
    isLocked: boolean
  }[]
  mintableAchievementsCount: number
  mintedAchievementsCount: number
  totalAchievementsCount: number
}

const data = [
  { text: 'Alphabetically' },
  { text: 'Favorites' },
  { text: 'Sort by Status' }
]

export default function GameAchievements({
  freeMints,
  basketAmount,
  game,
  achievements,
  mintedAchievementsCount,
  totalAchievementsCount,
  mintableAchievementsCount,
  ...rest
}: GameAchievementsProps) {
  const [selected, setSelected] = useState(data[0])
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })

  return (
    <div className={styles.container} {...rest}>
      <div className={styles.hero}>
        <Images.MobileHpLogo className={styles.logo} width={100} height={100} />
        <div className={styles.row}>
          <div className={styles.left}>
            <CircularButton className={styles.navItem}>
              <Images.ChevronLeft width="16" height="16" />
            </CircularButton>
            <CircularButton className={styles.navItem} disabled={true}>
              <Images.ChevronRight width="16" height="16" />
            </CircularButton>
          </div>

          <div className={styles.right}>
            <p className="text--md">
              Free mints: <span className="weight--semibold">{freeMints}</span>
            </p>
            <Basket amount={basketAmount} />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <p
              className="text--4xl"
              style={{ fontFamily: 'var(--primary-font-family)' }}
            >
              {game.title}
            </p>
            <div className={styles.tagList}>
              {game.tags.map((tag) => (
                <div
                  key={tag}
                  className={cn(styles.tag, styles.colorNeutral400, 'text--xs')}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.progress}>
            <AchievementProgress
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
              mintedProgress={mintedProgress}
              mintableProgress={mintableProgress}
            />
            <ProgressKey
              className={styles.progressKey}
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
            />
          </div>
        </div>
      </div>

      <div className={styles.achievements}>
        <div className={styles.row}>
          <p
            className={cn(
              styles.colorNeutral400,
              'text--2xl',
              'weight--semibold'
            )}
          >
            Achievements
          </p>

          <Dropdown
            options={data}
            onItemChange={setSelected}
            selected={selected}
            targetWidth="300"
            dropdownButtonDivProps={{
              className: 'title-sm'
            }}
          />
        </div>

        <div className={styles.list}>
          {achievements.map(({ id, title, description, image, isLocked }) => (
            <div key={id} className={styles.row}>
              <div className={styles.achievementData}>
                <Image
                  className={styles.image}
                  src={image}
                  height={80}
                  width={80}
                  withPlaceholder
                  placeholder={<div className={styles.fallback} />}
                />
                <div className={styles.achievementInfo}>
                  <div className="text--lg weight--medium">{title}</div>
                  <div className={cn(styles.colorNeutral400, 'text--md')}>
                    {description}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  styles.colorNeutral400,
                  styles.achievementState,
                  'text--sm'
                )}
              >
                {isLocked ? (
                  <div className={styles.locked}>Locked</div>
                ) : (
                  <div className={styles.unlocked}>
                    <div>Unlocked</div>
                    <Images.CheckmarkCircleOutline
                      fill="var(--color-neutral-400)"
                      width={21}
                      height={21}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
