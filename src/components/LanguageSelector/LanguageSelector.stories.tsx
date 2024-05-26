import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSelector, LanguageSelectorProps } from '.'

const meta: Meta<typeof LanguageSelector> = {
  title: 'LanguageSelector',
  component: LanguageSelector
}

export default meta

type Story = StoryObj<typeof LanguageSelector>

const props: LanguageSelectorProps = {
  i18n: {
    changeLanguage: (lang: string) => console.log('lang changed to ', lang)
  }
}

export const Default: Story = {
  args: { ...props }
}
