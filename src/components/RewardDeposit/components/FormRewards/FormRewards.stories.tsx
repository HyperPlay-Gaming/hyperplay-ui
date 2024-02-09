import type { Meta, StoryObj } from '@storybook/react'

import { FormRewards, FormRewardsProps } from './index'

type Story = StoryObj<typeof FormRewards>

const meta: Meta<typeof FormRewards> = {
  title: 'Quests/RewardDeposit/FormRewards',
  component: FormRewards,
  excludeStories: ['formRewardsProps']
}

export default meta

export const formRewardsProps: FormRewardsProps = {
  /* erc20 and erc721 props*/
  tokenFromNumberInputProps: {
    placeholder: '0',
    label: 'From'
  },
  tokenToNumberInputProps: {
    placeholder: '99',
    label: 'To'
  },
  amountPerUserTextInputProps: {
    placeholder: 'Paste token ID',
    label: 'Token ID'
  },
  totalPlayerReachNumberInputProps: {
    placeholder: '0',
    label: 'Enter Total Player Reach'
  },
  tokenIdsNumberInputs: [
    {
      placeholder: 'Paste token ID',
      label: 'Token ID: GOLD'
    },
    {
      placeholder: 'Paste token ID',
      label: 'Token ID: SILVER'
    }
  ],
  totalPlayerReachNumberInputs: [
    {
      placeholder: '0',
      label: 'Total Player Reach: GOLD'
    },
    {
      placeholder: '0',
      label: 'Total Player Reach: SILVER'
    }
  ],
  tokenIdsList: [
    {
      tokenId: 55,
      onRemoveTap: () => console.log('remove1 ')
    },
    {
      tokenId: 54,
      onRemoveTap: () => console.log('remove2 ')
    },
    {
      tokenId: 65,
      onRemoveTap: () => console.log('remove3 ')
    }
  ],
  onAddTokenTap: () => console.log('add token'),
  i18n: {
    tokenIdsTitle: 'Token IDs',
    orAddManually: 'Or add manually',
    callToActionAddToken: 'Add Token IDs',
    addedTokenCounterText: 'IDs added:',
    collapseAllIds: 'Collapse all IDs',
    pressEnterToAdd: 'Press enter to add'
  }
}

export const Default: Story = {
  args: { ...formRewardsProps }
}
