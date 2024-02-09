import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  formRewardsProps,
  genericInputProp
} from './components/FormRewards/FormRewards.stories'
import {
  RewardsSummary,
  RewardsSummaryI18n,
  RewardsSummaryProps
} from './index'

type Story = StoryObj<typeof RewardsSummary>

const meta: Meta<typeof RewardsSummary> = {
  title: 'Quests/RewardsSummary',
  component: RewardsSummary
}

export default meta

const i18n: RewardsSummaryI18n = {
  confirm: 'Confirm',
  remove: 'Remove',
  ...formRewardsProps.i18n
}

const props: RewardsSummaryProps = {
  title: 'Reward 1',
  editable: true,
  onEditableChange: (editable) => console.log(`editable: ${editable}`),
  ...formRewardsProps,
  i18n
}

export const Default: Story = {
  args: { ...props }
}

export const Confirmed: Story = {
  args: { ...props },
  render: (args) => {
    const [erc1155Tokens, setErc1155Tokens] = useState(args.tokenIdsInputProps)

    return (
      <RewardsSummary
        {...args}
        editable={true}
        onEditableChange={(edit) => console.log('editable changed to ', edit)}
        addTokenId={() => {
          console.log('add token id')
          console.log(erc1155Tokens)
          const newTokenId = {
            onRemoveClick: () =>
              console.log(`remove reward input ${erc1155Tokens.length}`),
            tokenNameInputProps: genericInputProp('Token Name'),
            amountPerUserInputProps: genericInputProp('0')
          }
          const newTokenArray = [...erc1155Tokens, newTokenId]
          console.log(newTokenArray)
          setErc1155Tokens(newTokenArray)
        }}
      />
    )
  }
}
