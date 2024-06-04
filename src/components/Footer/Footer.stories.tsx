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
    badges: { href: 'https://github.com/HyperPlay-Gaming/branding-resources' },
    downloads: { href: 'https://www.hyperplay.xyz/downloads' }
  },
  langSelectorProps: {
    i18n: {
      changeLanguage: (lang: string) => console.log('lang changed to ', lang)
    }
  },
  flags: {
    showLangSelector: true
  }
}

export const Default: Story = {
  args: { ...props }
}