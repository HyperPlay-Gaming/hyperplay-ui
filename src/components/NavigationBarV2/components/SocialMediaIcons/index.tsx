import { DiscordFilled, XLogoFilled } from '@/assets/images'
import Button from '@/components/Button'

import { SocialMediaLinksProps } from '../../types'
import styles from './SocialMediaIcons.module.scss'

export const SocialMediaIcons = ({
  links,
  className,
  isButtons
}: SocialMediaLinksProps) =>
  isButtons ? (
    <div className={className}>
      <a
        href={links.x}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialMediaLink}
      >
        <Button
          type="secondaryGradient"
          size="medium"
          className={styles.mobileMenuButton}
          colorDirection="to right"
        >
          <XLogoFilled className={styles.menuButtonIcon} />
        </Button>
      </a>
      <a
        href={links.discord}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialMediaLink}
      >
        <Button
          type="secondaryGradient"
          size="medium"
          className={styles.mobileMenuButton}
          colorDirection="to right"
        >
          <DiscordFilled className={styles.menuButtonIcon} />
        </Button>
      </a>
    </div>
  ) : (
    <div className={className}>
      <a
        href={links.x}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialMediaLink}
      >
        <XLogoFilled className={styles.menuButtonIcon} />
      </a>
      <a
        href={links.discord}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialMediaLink}
      >
        <DiscordFilled className={styles.menuButtonIcon} />
      </a>
    </div>
  )
