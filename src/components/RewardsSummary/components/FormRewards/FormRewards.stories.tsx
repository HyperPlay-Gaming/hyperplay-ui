import { chainMap } from '@hyperplay/chains'
import type { Meta, StoryObj } from '@storybook/react'

import { itemType } from '@/components/Dropdowns/Dropdown'

import { FormRewards, FormRewardsProps } from './index'

type Story = StoryObj<typeof FormRewards>

const meta: Meta<typeof FormRewards> = {
  title: 'Quests/RewardsSummary/FormRewards',
  component: FormRewards
}

export default meta

const defaultNetworks = Object.keys(chainMap).map((val) => {
  return {
    value: chainMap[val].chain.chainId.toString(),
    label: chainMap[val].chain.name
  }
})

const props: FormRewardsProps = {
  /* Form Rewards top level props */
  tokenAddressTextInputProps: {
    placeholder: 'Enter Token Address',
    label: 'Token Contract Address'
  },
  onDropdownSelectionChange: (item: itemType) => console.log(item),
  networkSelectCreatableProps: {
    i18n: {
      searchValue: 'Search for Network'
    },
    options: defaultNetworks.map((val) => val.value),
    onChange: (option) => console.log(option),
    onCreated: (option) => console.log(option)
  },

  /* erc20 and erc721 props*/
  tokenNameTextInputProps: {
    placeholder: 'Enter Token Name',
    label: 'Token Name'
  },
  amountPerUserTextInputProps: {
    placeholder: 'Enter Amount Per User',
    label: 'Amount Per User'
  },
  decimalsTextInputProps: { placeholder: '0', label: 'Decimals' },

  /* erc1155 props*/
  erc1155RewardInputs: [
    {
      onRemoveClick: () => console.log('remove reward input 0'),
      tokenNameTextInputProps: {
        placeholder: 'Enter Token Name',
        label: 'Token Name'
      },
      amountPerUserTextInputProps: {
        placeholder: '0',
        label: 'Amount Per User'
      }
    }
  ],
  addTokenId: () => console.log('add token'),
  i18n: {
    addTokenId: 'Add Token ID'
  },

  /* all erc child component props */
  marketplaceUrlTextInputProps: {
    placeholder: 'Enter Marketplace URL',
    label: 'Marketplace URL'
  }
}

export const Default: Story = {
  args: { ...props }
}
