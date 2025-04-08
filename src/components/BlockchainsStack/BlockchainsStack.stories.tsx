import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import BlockchainsStack from '.'

const meta = {
  title: 'Components/BlockchainsStack',
  component: BlockchainsStack,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof BlockchainsStack>

export default meta
type Story = StoryObj<typeof BlockchainsStack>

export const Default: Story = {
  args: {
    chainId: [
      '9901',
      '11111',
      '1789',
      '2357',
      '200',
      '210',
      '1',
      '1789',
      '2357',
      '13371'
    ],
    maxVisible: 5,
    showMoreCount: true
  },
  play: async ({ canvasElement }) => {
    const moreButton = within(canvasElement)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await userEvent.hover(moreButton.getByTestId('blockchain-more-button'), {
      delay: 800
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))
    await expect(
      moreButton.getByTestId('blockchain-more-button')
    ).toBeInTheDocument()

    await userEvent.unhover(moreButton.getByTestId('blockchain-more-button'), {
      delay: 800
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await expect(
      moreButton.getByTestId('blockchain-more-button')
    ).toBeInTheDocument()
  }
}

export const NoCounter: Story = {
  args: {
    chainId: ['9901', '11111', '1789', '2357', '200'],
    maxVisible: 5,
    showMoreCount: false
  }
}
