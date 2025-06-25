import type { Meta, StoryObj } from '@storybook/react'
import IconsStack from './index'
import {
  MetaMaskWallet,
  RoninWallet,
  CoinBaseWallet,
  TrustWallet,
  PhantomWallet,
  SequenceWallet,
  OKXWallet,
  GateWallet
} from '@/assets/images'
import { expect, userEvent, waitFor, within } from '@storybook/test'

import storyStyles from './IconsStackStories.module.scss'

const meta = {
  title: 'Components/IconsStack',
  component: IconsStack,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof IconsStack>

export default meta

type Story = StoryObj<typeof IconsStack>

const walletIcons = [
  { title: 'MetaMask Wallet', icon: <MetaMaskWallet /> },
  { title: 'Ronin Wallet', icon: <RoninWallet /> },
  { title: 'Coinbase Wallet', icon: <CoinBaseWallet /> },
  { title: 'Trust Wallet', icon: <TrustWallet /> },
  { title: 'Phantom Wallet', icon: <PhantomWallet /> },
  { title: 'Sequence Wallet', icon: <SequenceWallet /> },
  { title: 'OKX Wallet', icon: <OKXWallet /> },
  { title: 'GateWallet', icon: <GateWallet /> }
]

export const Default: Story = {
  args: {
    title: 'WALLETS:',
    icons: walletIcons,
    maxVisible: 5,
    showMore: true
  },
  play: async ({ canvasElement }) => {
    const moreButton = within(canvasElement)
    await waitFor(async () =>
      expect(moreButton.getByTestId('icons-more-button')).toBeInTheDocument()
    )

    await userEvent.hover(moreButton.getByTestId('icons-more-button'), {
      delay: 800
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))
    await expect(
      moreButton.getByTestId('icons-more-button')
    ).toBeInTheDocument()

    await userEvent.unhover(moreButton.getByTestId('icons-more-button'), {
      delay: 800
    })
  }
}

export const WithCustomClassNames: Story = {
  args: {
    title: 'SUPPORTED WALLETS:',
    icons: walletIcons,
    maxVisible: 5,
    showMore: true
  }
}

export const WithoutTitle: Story = {
  args: {
    icons: walletIcons.slice(0, 3),
    maxVisible: 3,
    showMore: false
  }
}

export const ForceShowMore: Story = {
  args: {
    icons: walletIcons,
    maxVisible: 8,
    showMore: true,
    forceShowMore: true,
    classNames: {
      iconsContainer: storyStyles.iconsContainer
    }
  }
}
