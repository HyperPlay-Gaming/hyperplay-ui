import { HyperPlayFullTextLogo, BurgerOpenIcon, BurgerClosedIcon, DiscordFilled, XLogoFilled } from '@/assets/images';
import styles from './NavigationBarV2.module.scss';
import cn from 'classnames';
import Button from '@/components/Button';

interface NavigationBarV2I18nProp {
    store: string;
    quests: string;
    developers: string;
    docs: string;
    faq: string;
    installHyperPlayButton: string;
}

interface NavigationBarV2LinksProp {
    x: string;
    discord: string;
    store: string;
    quests: string;
    developers: string;
    docs: string;
    faq: string;
}

interface NavigationLinksProps {
    className?: string
    meneItemClassName?: string
    links: NavigationBarV2LinksProp
    i18n: NavigationBarV2I18nProp
}

interface SocialMediaLinksProps {
    links: NavigationBarV2LinksProp
    className?: string
    isButtons?: boolean
}

interface MobileMenuProps {
    isOpen?: boolean
    links: NavigationBarV2LinksProp
    i18n: NavigationBarV2I18nProp
}

interface LogoComponentProps {
    className?: string
}

export const defaultI18n: NavigationBarV2I18nProp = {
    store: 'Store',
    quests: 'Quests',
    developers: 'Developers',
    docs: 'Docs',
    faq: 'FAQ',
    installHyperPlayButton: 'Install HyperPlay'
};

export interface NavigationBarV2Props {
    className?: string;
    isMobileMenuOpen?: boolean;
    links: NavigationBarV2LinksProp;
    onMenuTap: () => void;
    i18n?: NavigationBarV2I18nProp;
}


const HyperPlayLogo = ({ className }: LogoComponentProps) => (
    <HyperPlayFullTextLogo className={className} />
);

const NavigationLinks = ({ className, meneItemClassName, links, i18n }: NavigationLinksProps) => (
    <div className={className}>
        <a href={links.store}>
            <div className={meneItemClassName}>
                {i18n.store}
            </div>
        </a>
        <a href={links.quests}>
            <div className={meneItemClassName}>
                {i18n.quests}
            </div>
        </a>
        <a href={links.developers}>
            <div className={meneItemClassName}>
                {i18n.developers}
            </div>
        </a>
        <a href={links.docs}>
            <div className={meneItemClassName}>
                {i18n.docs}
            </div>
        </a>
        <a href={links.faq}>
            <div className={meneItemClassName}>
                {i18n.faq}
            </div>
        </a>
    </div>
);

const SocialMediaIcons = ({ links, className, isButtons }: SocialMediaLinksProps) => (
    isButtons ? (
        <div className={className}>
            <a href={links.x} target="_blank" rel="noopener noreferrer" className={styles.socialMediaLink}>
                <Button type="secondaryGradient" size="medium" className={styles.mobileMenuButton} colorDirection="to right">
                    <XLogoFilled className={styles.menuButtonIcon} />
                </Button>
            </a>
            <a href={links.discord} target="_blank" rel="noopener noreferrer" className={styles.socialMediaLink}>
                <Button type="secondaryGradient" size="medium" className={styles.mobileMenuButton} colorDirection="to right">
                    <DiscordFilled className={styles.menuButtonIcon} />
                </Button>
            </a>
        </div>
    ) : (
        <div className={className}>
            <a href={links.x} target="_blank" rel="noopener noreferrer" className={styles.socialMediaLink}>
                <XLogoFilled className={styles.menuButtonIcon} />
            </a>
            <a href={links.discord} target="_blank" rel="noopener noreferrer" className={styles.socialMediaLink}>
                <DiscordFilled className={styles.menuButtonIcon} />
            </a>
        </div>
    )
);

const MobileMenu = ({ isOpen, links, i18n }: MobileMenuProps) => (
    <div className={cn(styles.mobileMenu, { [styles.isMenuOpen]: isOpen })}>
        <NavigationLinks links={links} i18n={i18n} className={styles.mobileMenuLinks} meneItemClassName={styles.mobileMenuLink} />
        <SocialMediaIcons 
            links={links}
            className={styles.mobileMenuButtonsList}
            isButtons={true} 
        />
    </div>
);

const NavigationBarV2 = ({ className, isMobileMenuOpen, links, onMenuTap, i18n = defaultI18n }: NavigationBarV2Props) => {
    return (
        <div className={cn(styles.root, { [styles.isOpenHeight]: isMobileMenuOpen }, className)}>
            <div className={styles.innerWrapper}>
                <HyperPlayLogo className={styles.logo} />

                <NavigationLinks links={links} i18n={i18n} className={styles.desktopLinks} meneItemClassName={styles.desktopLink}  />

                <div className={styles.desktopActionsList}>
                    <div className={styles.mobileMenuIcon}>
                        {isMobileMenuOpen 
                        ? <BurgerOpenIcon className={styles.mobileMenuToggleIcon} onClick={onMenuTap} /> 
                        : <BurgerClosedIcon className={styles.mobileMenuToggleIcon} onClick={onMenuTap} />}
                    </div>
                    <SocialMediaIcons links={links} className={styles.socialMediaButtons} />
                    <div className={styles.installButton}>
                        <Button type="secondaryGradient" size="medium" spacing="lg" colorDirection="to right">{i18n.installHyperPlayButton}</Button>
                    </div>
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} links={links} i18n={i18n} />
        </div>
    );
};

export default NavigationBarV2;