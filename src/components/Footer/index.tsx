import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { GetHyperPlay } from '@/assets/images'

import { LanguageSelector, LanguageSelectorProps } from '../LanguageSelector'
import FooterSectionStyle from './Footer.module.scss'

type LinkProps = Partial<Omit<HTMLAnchorElement, 'className'>>

export interface FooterProps extends HTMLProps<HTMLDivElement> {
  langSelectorProps: LanguageSelectorProps
  Link?: React.ElementType
  address?: string
  i18n?: {
    company: string
    brand: string
    privacyPolicy: string
    termsOfService: string
    cookiePolicy: string
    social: string
    resources: string
    documentation: string
    badges: string
    getTheApp: string
    getHyperPlayApp: string
    developerAgreement?: string
    careers?: string
  }
  linkProps: {
    privacyPolicy: LinkProps
    termsOfService: LinkProps
    cookiePolicy: LinkProps
    badges: LinkProps
    downloads: LinkProps
    developerAgreement?: LinkProps
  }
  flags: {
    showLangSelector: boolean
    showGetTheApp?: boolean
    showBrandLink?: boolean
    showMetaMaskLink?: boolean
    showCareersLink?: boolean
  }
}

export function Footer({
  langSelectorProps,
  address,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Link = (props: any) => <a {...props} />,
  linkProps,
  i18n = {
    company: 'COMPANY',
    brand: 'BRAND',
    privacyPolicy: 'PRIVACY POLICY',
    termsOfService: 'TERMS OF SERVICE',
    cookiePolicy: 'COOKIE POLICY',
    social: 'Social',
    resources: 'RESOURCES',
    documentation: 'DOCUMENTATION',
    badges: 'BADGES',
    getTheApp: 'Get the App',
    getHyperPlayApp: 'Get HyperPlay Apps',
    developerAgreement: 'DEVELOPER AGREEMENT',
    careers: 'CAREERS'
  },
  flags = {
    showLangSelector: false,
    showGetTheApp: true,
    showBrandLink: true,
    showMetaMaskLink: true,
    showCareersLink: true
  },
  ...props
}: FooterProps) {
  let langSelector = null
  let getTheApp = null
  if (flags.showLangSelector) {
    langSelector = <LanguageSelector {...langSelectorProps} />
  }
  if (flags.showGetTheApp) {
    getTheApp = (
      <>
        <h2 className={FooterSectionStyle.footer__title}>{i18n.getTheApp}</h2>
        <div className={FooterSectionStyle.footer__links}>
          <Link
            className={FooterSectionStyle.footer__link}
            {...linkProps.downloads}
          >
            <GetHyperPlay />
          </Link>
        </div>
      </>
    )
  }

  return (
    <div {...props} className={cn(FooterSectionStyle.root)}>
      <div className={cn(FooterSectionStyle.footer)}>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.company}</h2>
          <div className={FooterSectionStyle.footer__links}>
            <Link
              className={FooterSectionStyle.footer__link}
              href="https://docs.hyperplay.xyz/faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </Link>
            {flags.showBrandLink ? (
              <a
                className={FooterSectionStyle.footer__link}
                href="https://github.com/HyperPlay-Gaming/branding-resources"
                target="_blank"
                rel="noopener noreferrer"
              >
                {i18n.brand}
              </a>
            ) : null}
            {flags.showCareersLink ? (
              <a
                className={FooterSectionStyle.footer__link}
                href="https://jobs.ashbyhq.com/windranger?departmentId=d4a6dd89-7856-4045-921b-e982d346249c"
                target="_blank"
                rel="noopener noreferrer"
              >
                {i18n.careers}
              </a>
            ) : null}
            <Link
              className={FooterSectionStyle.footer__link}
              {...linkProps.privacyPolicy}
            >
              {i18n.privacyPolicy}
            </Link>
            <Link
              className={FooterSectionStyle.footer__link}
              {...linkProps.termsOfService}
            >
              {i18n.termsOfService}
            </Link>
            <Link
              className={FooterSectionStyle.footer__link}
              {...linkProps.cookiePolicy}
            >
              {i18n.cookiePolicy}
            </Link>
            {linkProps.developerAgreement ? (
              <Link
                className={FooterSectionStyle.footer__link}
                {...linkProps.developerAgreement}
              >
                {i18n.developerAgreement}
              </Link>
            ) : null}
          </div>
        </div>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.social}</h2>
          <div className={FooterSectionStyle.footer__links}>
            <a
              className={FooterSectionStyle.footer__link}
              href="https://twitter.com/HyperPlayGaming"
              target="_blank"
              rel="noopener noreferrer"
            >
              TWITTER
            </a>
            <a
              className={FooterSectionStyle.footer__link}
              href="https://discord.gg/hyperplay"
              target="_blank"
              rel="noopener noreferrer"
            >
              DISCORD
            </a>
          </div>
        </div>
        <div className={FooterSectionStyle.footer__column}>
          <h2 className={FooterSectionStyle.footer__title}>{i18n.resources}</h2>
          <div className={FooterSectionStyle.footer__links}>
            <Link
              className={FooterSectionStyle.footer__link}
              href="https://docs.hyperplay.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.documentation}
            </Link>
            {flags.showMetaMaskLink ? (
              <a
                className={FooterSectionStyle.footer__link}
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                METAMASK
              </a>
            ) : null}
            <Link
              className={FooterSectionStyle.footer__link}
              {...linkProps.badges}
            >
              {i18n.badges}
            </Link>
          </div>
        </div>
        {flags.showGetTheApp || flags.showLangSelector ? (
          <div className={FooterSectionStyle.footer__column}>
            {getTheApp}
            {langSelector}
          </div>
        ) : null}
      </div>
      <div className={FooterSectionStyle.hpContact}>
        <div>{`HYPERPLAY LABS INC`}</div>
        <div>
          {address ??
            `600 W 6 th Street - Fourth Floor #1079, Fort Worth, TX 76102`}
        </div>
      </div>
    </div>
  )
}
