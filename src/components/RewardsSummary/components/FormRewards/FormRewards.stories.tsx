import { chainMap } from '@hyperplay/chains'
import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import type { Meta, StoryObj } from '@storybook/react'

import { itemType } from '@/components/Dropdowns/Dropdown'

import { FormRewards, FormRewardsProps } from './index'

type Story = StoryObj<typeof FormRewards>

const meta: Meta<typeof FormRewards> = {
  title: 'Quests/RewardsSummary/FormRewards',
  component: FormRewards,
  excludeStories: ['formRewardsProps', 'genericInputProp']
}

export default meta

const defaultNetworks = Object.keys(chainMap).map(
  (val) => chainMap[val].chain.name
)

/* eslint-disable-next-line */
export const genericInputProp = (value: any) => {
  const props: GetInputPropsReturnType = {
    value: value,
    /* eslint-disable-next-line */
    onChange: (val: any) => console.log('on change ', val)
  }
  return props
}

const rewardTypeValue: itemType = {
  text: 'ERC20'
}

export const formRewardsProps: FormRewardsProps = {
  rewardTypeInputProps: genericInputProp(rewardTypeValue),
  networkInputProps: genericInputProp(defaultNetworks[0]),
  contractAddressInputProps: genericInputProp('0x123456789123456789'),
  tokenNameInputProps: genericInputProp('Token name'),
  amountPerUserInputProps: genericInputProp('0'),
  marketplaceUrlInputProps: genericInputProp('https://opensea.io'),
  decimalsInputProps: genericInputProp('0'),

  networkOptions: defaultNetworks,
  tokenTypeOptions: ['ERC20', 'ERC721', 'ERC1155'].map((val) => ({
    text: val
  })),
  tokenIdsInputProps: [
    {
      tokenNameInputProps: genericInputProp(''),
      amountPerUserInputProps: genericInputProp(''),
      onRemoveClick: () => console.log('remove this')
    }
  ],
  addTokenId: () => console.log('add another erc1155 token'),
  i18n: {
    addTokenId: 'Add Token ID',
    placeholder: {
      rewardType: 'Please Select a Reward Type',
      network: 'Please Select a Network',
      contractAddress: 'Please Enter a Contract Address',
      tokenName: 'Please Enter a Token Name',
      marketplaceUrl: 'Please Enter a Marketplace URL',
      decimals: '0',
      amountPerUser: '0'
    },
    label: {
      rewardType: 'Reward Type',
      network: 'Chain',
      contractAddress: 'Contract Address',
      tokenName: 'Token Name',
      marketplaceUrl: 'Marketplace URL',
      decimals: 'Decimals',
      amountPerUser: 'Amount Per User'
    }
  }
}

export const Default: Story = {
  args: { ...formRewardsProps }
}
