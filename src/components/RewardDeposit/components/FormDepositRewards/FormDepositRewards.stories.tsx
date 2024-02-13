import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import type { Meta, StoryObj } from '@storybook/react'

import { FormDepositRewards, FormDepositRewardsProps } from './index'

type Story = StoryObj<typeof FormDepositRewards>

const meta: Meta<typeof FormDepositRewards> = {
  title: 'Quests/RewardDeposit/FormDepositRewards',
  component: FormDepositRewards,
  excludeStories: ['formDepositRewardsProps', 'genericInputProp']
}

export const genericInputProp = (value?: unknown) => {
  const props: GetInputPropsReturnType = {
    value: value,
    /* eslint-disable-next-line */
    onChange: (val: any) => console.log('on change ', val)
  }

  return props
}

export default meta

export const formDepositRewardsProps: FormDepositRewardsProps = {
  tokenFromNumberInputProps: genericInputProp(),
  tokenToNumberInputProps: genericInputProp(),
  amountPerUserTextInputProps: genericInputProp(),
  totalPlayerReachNumberInputProps: genericInputProp(),
  tokenIdGoldNumberInputProps: genericInputProp(),
  tokenIdSilverNumberInputProps: genericInputProp(),
  totalPlayerReachGoldNumberInputProps: genericInputProp(),
  totalPlayerReachSilverNumberInputProps: genericInputProp(),
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
    pressEnterToAdd: 'Press enter to add',
    selectRewardTokenType: 'Select Reward Type',
    placeholder: {
      tokenFrom: '0',
      tokenTo: '99',
      amountPerUser: 'Paste token ID',
      totalPlayerReach: '0',
      tokenIdGold: 'Paste token ID',
      tokenIdSilver: 'Paste token ID',
      totalPlayerReachGold: '0',
      totalPlayerReachSilver: '0'
    },
    label: {
      tokenFrom: 'From',
      tokenTo: 'To',
      amountPerUser: 'Token ID',
      totalPlayerReach: 'Enter Total Player Reach',
      tokenIdGold: 'Token ID: GOLD',
      tokenIdSilver: 'Token ID: SILVER',
      totalPlayerReachGold: 'Total Player Reach: GOLD',
      totalPlayerReachSilver: 'Total Player Reach: SILVER'
    }
  }
}

export const Default: Story = {
  args: { ...formDepositRewardsProps }
}
