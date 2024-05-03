import cn from 'classnames'

import hpClientImg from '@/assets/banners/HyperPlayClient.png?url'
import Button from '@/components/Button'

import styles from './Banner.module.scss'
import { ArrowUpRight } from '@/assets/images'

interface BannerI18nProp {
  title: string
  subtitle: string
  description: string
  submitGame: string
  installHp: string
}

export const defaultI18n: BannerI18nProp = {
  title: 'Freedom to Game',
  subtitle: 'One App. Every Store.',
  description:
    'Access a vast universe of games from top stores, including HyperPlay Store, Epic Games, and GOG all within a unified app.',
  submitGame: 'Submit a game',
  installHp: 'Install HyperPlay'
}

export interface BannerProps {
  className?: string
  contentClassName?: string
  i18n?: BannerI18nProp
  onTapInstall: () => void
  onTapSubmitGame: () => void
}

export const Banner = ({ className, contentClassName, onTapInstall, onTapSubmitGame, i18n = defaultI18n }: BannerProps) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.content, contentClassName)}>
        <div className={styles.contextText}>
          <p className={styles.bannerSubtitle}>{i18n.subtitle}</p>
          <h1 className={styles.bannerTitle}>{i18n.title}</h1>
          <p className={styles.bannerDescription}>{i18n.description}</p>  
        </div>
        <div className={styles.actionsList}>
          <Button
            className={cn(styles.submitGameButton, styles.bannerButton)}
            type="secondaryGradient"
            size="medium"
            spacing="xs"
            colorDirection="to right"
            rightIcon={(<ArrowUpRight className={styles.submitGameButtonIcon} />)}
            onClick={onTapInstall}
          >
            {i18n.submitGame}
          </Button>
          <Button
            className={cn(styles.installButton, styles.bannerButton)}
            size="medium"
            type="secondary"
            onClick={onTapSubmitGame}
          >
            {i18n.installHp}
          </Button>
        </div>
      </div>
      <div className={styles.banner}>
        <img
          src={hpClientImg}
          alt="HyperPlay Client"
          className={styles.bannerImage}
        />
      </div>
    </div>
  )
}
