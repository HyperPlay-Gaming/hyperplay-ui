import { chainMap } from '@hyperplay/chains'
import type { Meta, StoryObj } from '@storybook/react'

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
  onTokenAddressChange: (val) => console.log(`token address changed to ${val}`),
  onDropdownSelectionChange: (item) =>
    console.log(`dropdown selection changed to ${item}`),
  networkSelectCreatableProps: {
    options: defaultNetworks.map((val) => val.label),
    inputProps: {
      required: true,
      label: 'Chain',
      withAsterisk: true
    },
    onChange: (val) => console.log(`network select changed to ${val}`),
    onCreated: (val) => console.log(`network created as ${val}`)
  }
}

export const Default: Story = {
  args: { ...props }
}
