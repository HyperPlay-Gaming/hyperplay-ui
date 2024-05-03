import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { Banner, BannerProps, defaultI18n } from '.'

const props: BannerProps = {
  className: '',
  i18n: defaultI18n,
  onTapInstall: () => undefined,
  onTapSubmitGame: () => undefined
}

const meta: Meta<typeof Banner> = {
  title: 'Website/Banner',
  component: Banner,
  args: props
}

export default meta

type Story = StoryObj<typeof Banner>

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const installButton = canvas.getByRole('button', {
      name: /Install hyperplay/i
    })
    await expect(installButton).toBeInTheDocument()
    await expect(installButton).toBeEnabled()
    await userEvent.click(installButton)

    const submitButton = canvas.getByRole('button', { name: /Submit a game/i })
    await expect(submitButton).toBeInTheDocument()
    await expect(submitButton).toBeEnabled()
    await userEvent.click(submitButton)
  }
}

export const Smartphone: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const Tablet: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}
