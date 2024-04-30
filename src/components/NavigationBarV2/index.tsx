import cn from 'classnames'

import {
  BurgerClosedIcon,
  BurgerOpenIcon,
  DiscordFilled,
  HyperPlayFullTextLogo,
  XLogoFilled
} from '@/assets/images'
import Button from '@/components/Button'

import styles from './NavigationBarV2.module.scss'
import { NavigationBarV2I18nProp, NavigationBarV2Props, NavigationLinksProps, SocialMediaLinksProps, MobileMenuProps } from './types'

export const defaultI18n: NavigationBarV2I18nProp = {
  store: 'Store',
  quests: 'Quests',
  developers: 'Developers',
  docs: 'Docs',
  faq: 'FAQ',
  installHyperPlayButton: 'Install HyperPlay'
}

const NavigationLinks = ({
  className,
  menuItemClassName,
  links,
  i18n
}: NavigationLinksProps) => (
  <div className={className}>
    <a href={links.store}>
      <div className={menuItemClassName}>{i18n.store}</div>
    </a>
    <a href={links.quests}>
      <div className={menuItemClassName}>{i18n.quests}</div>
    </a>
    <a href={links.developers}>
      <div className={menuItemClassName}>{i18n.developers}</div>
    </a>
    <a href={links.docs}>
      <div className={menuItemClassName}>{i18n.docs}</div>
    </a>
    <a href={links.faq}>
      <div className={menuItemClassName}>{i18n.faq}</div>
    </a>
  </div>
)

const SocialMediaIcons = ({
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

const MobileMenu = ({ isOpen, links, i18n }: MobileMenuProps) => (
  <div className={cn(styles.mobileMenu, { [styles.isMenuOpen]: isOpen })}>
    <NavigationLinks
      links={links}
      i18n={i18n}
      className={styles.mobileMenuLinks}
      menuItemClassName={styles.mobileMenuLink}
    />
    <SocialMediaIcons
      links={links}
      className={styles.mobileMenuButtonsList}
      isButtons={true}
    />
  </div>
)

const NavigationBarV2 = ({
  className,
  isMobileMenuOpen,
  links,
  onMenuTap,
  i18n = defaultI18n
}: NavigationBarV2Props) => {
  return (
    <div
      className={cn(
        styles.root,
        { [styles.isOpenHeight]: isMobileMenuOpen },
        className
      )}
    >
      <div className={styles.innerWrapper}>
        <HyperPlayFullTextLogo className={className} />

        <NavigationLinks
          links={links}
          i18n={i18n}
          className={styles.desktopLinks}
          menuItemClassName={styles.desktopLink}
        />

        <div className={styles.desktopActionsList}>
          <div className={styles.mobileMenuIcon}>
            {isMobileMenuOpen ? (
              <BurgerOpenIcon
                className={styles.mobileMenuToggleIcon}
                onClick={onMenuTap}
              />
            ) : (
              <BurgerClosedIcon
                className={styles.mobileMenuToggleIcon}
                onClick={onMenuTap}
              />
            )}
          </div>
          <SocialMediaIcons
            links={links}
            className={styles.socialMediaButtons}
          />
          <div className={styles.installButton}>
            <Button
              type="secondaryGradient"
              size="medium"
              spacing="lg"
              colorDirection="to right"
            >
              {i18n.installHyperPlayButton}
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} links={links} i18n={i18n} />
    </div>
  )
}

export default NavigationBarV2
