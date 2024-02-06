import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { IconPencil } from '@tabler/icons-react'

import { Ellipsis, TrashCan } from '@/assets/images'

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
  addERC1155TokenId: () =>
    console.log('add new input field for erc 1155 token id'),
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

    let iconButton = (
      <button onClick={() => setEditable(true)}>
        <IconPencil color="var(--color-neutral-400)" />
      </button>
    )
    if (editable) {
      iconButton = (
        <button>
          <TrashCan fill="var(--color-neutral-400)" />
        </button>
      )
    }
    return (
      <RewardsSummary
        {...args}
        editable={editable}
        updateEditable={setEditable}
        icon={iconButton}
      />
    )
  }
}
