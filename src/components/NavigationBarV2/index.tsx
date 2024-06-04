import cn from 'classnames'

import {
  BurgerClosedIcon,
  BurgerOpenIcon,
  HyperPlayFullTextLogo,
} from '@/assets/images'
import Button from '@/components/Button'

import { NavigationLinks } from './components/NavigationLinks'
import { SocialMediaIcons } from './components/SocialMediaIcons'
import { MobileMenu } from './components/MobileMenu'

import styles from './NavigationBarV2.module.scss'

import {
  NavigationBarV2I18nProp,
  NavigationBarV2Props,
} from './types'

export const defaultI18n: NavigationBarV2I18nProp = {
  store: 'Store',
  quests: 'Quests',
  developers: 'Developers',
  docs: 'Docs',
  faq: 'FAQ',
  installHyperPlayButton: 'Install HyperPlay'
}

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
