import {
  NavigationLinksProps
} from '../../types'

export const NavigationLinks = ({
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
