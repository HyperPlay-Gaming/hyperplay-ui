import type { Meta, StoryObj } from '@storybook/react'

import { Footer, FooterProps } from '.'

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer
}

export default meta

type Story = StoryObj<typeof Footer>

const props: FooterProps = {
  linkProps: {
    privacyPolicy: { href: 'https://www.hyperplay.xyz/privacy-policy' },
    termsOfService: { href: 'https://www.hyperplay.xyz/terms-of-service' },
    cookiePolicy: { href: 'https://www.hyperplay.xyz/cookie-policy' },
    badges: { href: 'https://github.com/HyperPlay-Gaming/branding-resources' },
    downloads: { href: 'https://www.hyperplay.xyz/downloads' },
    developerAgreement: { href: 'https://www.hyperplay.xyz/downloads' }
  },
  langSelectorProps: {
    i18n: {
      changeLanguage: (lang: string) => console.log('lang changed to ', lang)
    }
  },
  flags: {
    showLangSelector: true,
    showGetTheApp: true,
    showBrandLink: true,
    showMetaMaskLink: true
  }
}

export const Default: Story = {
  args: { ...props }
}

export const WithoutGetTheApp: Story = {
  args: {
    ...props,
    flags: {
      ...props.flags,
      showGetTheApp: false,
      showBrandLink: true,
      showMetaMaskLink: true
    }
  }
}

export const WithoutGetTheAppAndLanguageSecltor: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: false,
      showGetTheApp: false,
      showBrandLink: true,
      showMetaMaskLink: true
    }
  }
}

export const WithoutLanguageSelector: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: false,
      showGetTheApp: true,
      showBrandLink: true,
      showMetaMaskLink: true
    }
  }
}

export const WithoutMetaMaskLink: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: true,
      showMetaMaskLink: false
    }
  }
}

export const WithoutBrandLink: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: true,
      showBrandLink: false
    }
  }
}

export const WithoutOptionalFlags: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: false,
      showGetTheApp: false,
      showBrandLink: false,
      showMetaMaskLink: false
    }
  }
}

export const WithoutOptionalLinks: Story = {
  args: {
    ...props,
    flags: {
      showLangSelector: true,
      showBrandLink: false,
      showMetaMaskLink: false
    }
  }
}
