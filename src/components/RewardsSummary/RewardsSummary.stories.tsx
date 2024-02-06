import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { IconEdit } from '@tabler/icons-react'

import { Ellipsis, TrashCan } from '@/assets/images'

import Button from '../Button'
import { rewardDetailsProps } from '../RewardDetails/RewardDetails.stories'
import { formRewardsProps } from './components/FormRewards/FormRewards.stories'
import { RewardsSummary, RewardsSummaryProps } from './index'

type Story = StoryObj<typeof RewardsSummary>

const meta: Meta<typeof RewardsSummary> = {
  title: 'Quests/RewardsSummary',
  component: RewardsSummary
}

export default meta

const props: RewardsSummaryProps = {
  title: 'Reward 1',
  icon: <Ellipsis />,
  rewardsProps: formRewardsProps,
  editable: true,
  updateEditable: (editable) => console.log(`editable: ${editable}`),
  rewardDetailsProps: rewardDetailsProps
}

export const Default: Story = {
  args: { ...props }
}

export const Confirmed: Story = {
  args: { ...props },
  render: (args) => {
    const [editable, setEditable] = useState(false)
    const [erc1155Tokens, setErc1155Tokens] = useState(
      args.rewardsProps.erc1155RewardInputs
    )

    let iconButton = (
      <button onClick={() => setEditable(true)}>
        <IconEdit color="var(--color-neutral-400)" />
      </button>
    )
    if (editable) {
      iconButton = (
        <Button
          type="tertiary"
          rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        >
          Remove
        </Button>
      )
    }
    return (
      <RewardsSummary
        {...args}
        editable={editable}
        updateEditable={setEditable}
        icon={iconButton}
        rewardsProps={{
          ...args.rewardsProps,
          erc1155RewardInputs: erc1155Tokens,
          addTokenId: () => {
            console.log('add token id')
            console.log(erc1155Tokens)
            const newTokenId = {
              onRemoveClick: () =>
                console.log(`remove reward input ${erc1155Tokens.length}`),
              tokenNameTextInputProps: {
                placeholder: 'Enter Token Name',
                label: 'Token Name'
              },
              amountPerUserTextInputProps: {
                placeholder: '0',
                label: 'Amount Per User'
              }
            }
            console.log('asdfdas')
            const newTokenArray = [...erc1155Tokens, newTokenId]
            console.log(newTokenArray)
            setErc1155Tokens(newTokenArray)
          }
        }}
      />
    )
  }
}
