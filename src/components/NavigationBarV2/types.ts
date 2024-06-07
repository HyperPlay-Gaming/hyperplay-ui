export interface NavigationBarV2I18nProp {
  store: string
  quests: string
  developers: string
  docs: string
  faq: string
  installHyperPlayButton: string
}

export interface NavigationBarV2LinksProp {
  x: string
  discord: string
  store: string
  quests: string
  developers: string
  docs: string
  faq: string
}

export interface NavigationLinksProps {
  className?: string
  menuItemClassName?: string
  links: NavigationBarV2LinksProp
  i18n: NavigationBarV2I18nProp
}

export interface SocialMediaLinksProps {
  links: NavigationBarV2LinksProp
  className?: string
  isButtons?: boolean
}

export interface MobileMenuProps {
  isOpen?: boolean
  links: NavigationBarV2LinksProp
  i18n: NavigationBarV2I18nProp
}

export interface NavigationBarV2Props {
  className?: string
  isMobileMenuOpen?: boolean
  links: NavigationBarV2LinksProp
  onMenuTap: () => void
  i18n?: NavigationBarV2I18nProp
}
