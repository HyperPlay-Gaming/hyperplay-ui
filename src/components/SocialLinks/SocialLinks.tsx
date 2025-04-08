import React, { HTMLAttributes } from 'react'

import cn from 'classnames'

import { DiscordFilled, Globe, X, Youtube } from '@/assets/images'

import Button from '../Button'
import styles from './SocialLinks.module.scss'

export interface SocialLink {
  type: string
  url: string
  className?: string
}

export interface SocialLinksProps extends HTMLAttributes<HTMLDivElement> {
  socialLinks: SocialLink[]
}

const socialIcons = (type: string) => {
  switch (type) {
    case 'website':
      return { icon: Globe, className: styles.websiteIcon }
    case 'twitter':
      return { icon: X, className: styles.twitterIcon }
    case 'discord':
      return { icon: DiscordFilled, className: styles.discordIcon }
    case 'youtube':
      return { icon: Youtube, className: styles.youtubeIcon }
    default:
      return { icon: Globe, className: styles.websiteIcon }
  }
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles.socialLinks, className)} {...props}>
      {socialLinks.map((link, index) => {
        const { icon: Icon, className } = socialIcons(link.type)
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="secondary" size="icon">
              {Icon ? <Icon className={className} /> : null}
            </Button>
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
