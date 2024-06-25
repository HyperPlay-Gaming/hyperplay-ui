import cn from 'classnames';



import { ArrowUpRight } from '@/assets/images';
import Button from '@/components/Button';



import styles from './Banner.module.scss';


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
  classNames?: {
    root?: string
    content?: string
    bannerContainer?: string
    bannerImage?: string
  }
  bannerImagePath: string
  hasBannerGradient?: boolean
  i18n?: BannerI18nProp
  onTapInstall: () => void
  onTapSubmitGame: () => void
}

export const Banner = ({
  classNames,
  bannerImagePath,
  hasBannerGradient,
  onTapInstall,
  onTapSubmitGame,
  i18n = defaultI18n
}: BannerProps) => {
  return (
    <div className={cn(styles.root, classNames?.root)}>
      <div className={cn(styles.content, classNames?.content)}>
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
            style={
              {
                '--color-direction': 'to right'
              } as React.CSSProperties
            }
            rightIcon={<ArrowUpRight className={styles.submitGameButtonIcon} />}
            onClick={onTapSubmitGame}
          >
            {i18n.submitGame}
          </Button>
          <Button
            className={cn(styles.installButton, styles.bannerButton)}
            size="medium"
            type="secondary"
            onClick={onTapInstall}
          >
            {i18n.installHp}
          </Button>
        </div>
      </div>
      <div className={cn(styles.banner, hasBannerGradient ? styles.gradient : null, classNames?.bannerContainer)}>
        <img
          src={bannerImagePath}
          alt="HyperPlay Client"
          className={cn(styles.bannerImage, classNames?.bannerImage)}
        />
      </div>
    </div>
  )
}

export default Banner