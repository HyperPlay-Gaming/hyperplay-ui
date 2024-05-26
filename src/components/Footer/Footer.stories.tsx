import type { Meta, StoryObj } from '@storybook/react'

import { Footer, FooterProps } from '.'

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer
}

export default meta

type Story = StoryObj<typeof Footer>

const props: FooterProps = {
  links: {
    privacyPolicy: 'https://www.hyperplay.xyz/privacy-policy',
    termsOfService: 'https://www.hyperplay.xyz/terms-of-service',
    badges: 'https://github.com/HyperPlay-Gaming/branding-resources',
    downloads: 'https://www.hyperplay.xyz/downloads'
  },
  langSelectorProps: {
    i18n: {
      changeLanguage: (lang: string) => console.log('lang changed to ', lang)
    }
  }
}

export const Default: Story = {
  args: { ...props }
}
