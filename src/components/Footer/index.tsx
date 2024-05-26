import React from 'react'

import { GetHyperPlay } from '@/assets/images'

import { LanguageSelector, LanguageSelectorProps } from '../LanguageSelector'
import FooterSectionStyle from './Footer.module.scss'

export interface FooterProps {
  langSelectorProps: LanguageSelectorProps
  Link?: React.ElementType
  i18n?: {
    company: string
    brand: string
    privacyPolicy: string
    termsOfService: string
    social: string
    resources: string
    documentation: string
    badges: string
    getTheApp: string
    getHyperPlayApp: string
  }
}

export function Footer({
  langSelectorProps,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Link = (props: any) => <a {...props} />,
  i18n = {
    company: 'COMPANY',
    brand: 'BRAND',
    privacyPolicy: 'PRIVACY POLICY',
    termsOfService: 'TERMS OF SERVICE',
    social: 'Social',
    resources: 'RESOURCES',
    documentation: 'DOCUMENTATION',
    badges: 'BADGES',
    getTheApp: 'Get the App',
    getHyperPlayApp: 'Get HyperPlay Apps'
  }
}: FooterProps) {
  return (
    <>
      <div className={FooterSectionStyle.footer}>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.company}</h2>
          <Link
            className={FooterSectionStyle.footer__link}
            href="https://docs.hyperplay.xyz/faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ
          </Link>
          <a
            className={FooterSectionStyle.footer__link}
            href="https://github.com/HyperPlay-Gaming/branding-resources"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.brand}
          </a>
          <Link
            className={FooterSectionStyle.footer__link}
            href="/privacy-policy"
          >
            {i18n.privacyPolicy}
          </Link>
          <Link
            className={FooterSectionStyle.footer__link}
            href="/terms-of-service"
          >
            {i18n.termsOfService}
          </Link>
        </div>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.social}</h2>
          <a
            className={FooterSectionStyle.footer__link}
            href="https://twitter.com/HyperPlayGaming"
          >
            TWITTER
          </a>
          <a
            className={FooterSectionStyle.footer__link}
            href="https://discord.gg/hyperplay"
          >
            DISCORD
          </a>
        </div>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.resources}</h2>
          <Link
            className={FooterSectionStyle.footer__link}
            href="https://docs.hyperplay.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.documentation}
          </Link>
          <a
            className={FooterSectionStyle.footer__link}
            href="https://metamask.io"
          >
            METAMASK
          </a>
          <Link className={FooterSectionStyle.footer__link} href="/badges">
            {i18n.badges}
          </Link>
        </div>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.getTheApp}</h2>
          <Link className={FooterSectionStyle.footer__link} href="/downloads">
            <GetHyperPlay />
          </Link>
          <LanguageSelector {...langSelectorProps} />
        </div>
      </div>
      <div className={FooterSectionStyle.hpContact}>
        <div>{`HYPERPLAY LABS INC`}</div>
        <div>{`254 CHAPMAN RD - STE 208 - 12083 NEWARK, DE 19702`}</div>
      </div>
    </>
  )
}
