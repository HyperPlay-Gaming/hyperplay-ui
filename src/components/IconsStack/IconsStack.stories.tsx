import type { Meta, StoryObj } from '@storybook/react'
import IconsStack from './index'
import {
  MetaMaskWallet,
  RoninWallet,
  CoinbaseWallet,
  TrustWallet,
  PhantomWallet,
  SequenceWallet,
  OKXWallet
} from '@/assets/images'

const meta = {
  title: 'Components/IconsStack',
  component: IconsStack,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof IconsStack>

export default meta

type Story = StoryObj<typeof IconsStack>

export const Default: Story = {
  args: {
    icons: [
      <MetaMaskWallet key="metaMask" />,
      <RoninWallet key="ronin" />,
      <TrustWallet key="trust" />,
      <PhantomWallet key="phantom" />,
      <OKXWallet key="okx" />,
      <SequenceWallet key="sequence" />,
      <CoinbaseWallet key="coinbase" />
    ],
    maxVisible: 7,
    showMore: false,
    forceShowMore: true
  }
}
