import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'

import Menu from '@/components/Menu'
import styles from '@/components/RewardDetails/RewardDetails.module.scss'

import { RewardDetails, RewardDetailsProps } from '.'

const meta: Meta<typeof RewardDetails> = {
  title: 'Quests/RewardDetails',
  component: RewardDetails,
  excludeStories: ['rewardDetailsProps']
}

export default meta

type Story = StoryObj<typeof RewardDetails>

export const rewardDetailsProps: RewardDetailsProps = {
  title: 'Reward 1',
  chainName: 'Polygon',
  tokenType: 'ERC-721',
  tokenSymbol: 'GOLD',
  rewardPerPlayer: '1',
  marketplace: 'Opensea',
  tokenContractAddress: '0x955CF'
}

export const Default: Story = {
  args: { ...rewardDetailsProps }
}

export const NoMarketplace: Story = {
  args: { ...rewardDetailsProps, marketplace: '' }
}

export const WithIcon: Story = {
  args: {
    ...rewardDetailsProps,
    icon: (
      <Menu shadow="md" position="bottom-end" width={120}>
        <Menu.Target>
          <button className={styles.menuButton}>
            <IconDotsVertical color="var(--color-neutral-400)" />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Item leftSection={<IconPencil size={14} />}>Edit</Menu.Item>
          <Menu.Item
            className={styles.deleteButton}
            leftSection={<IconTrash size={14} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }
}
