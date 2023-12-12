import type { Meta, StoryObj } from '@storybook/react'

import ZkSyncQuestBanner, { ZkSyncQuestBannerProps } from '.'

const meta: Meta<typeof ZkSyncQuestBanner> = {
  title: 'Banners/ZkSyncQuestBanner',
  component: ZkSyncQuestBanner
}

export default meta

type Story = StoryObj<typeof ZkSyncQuestBanner>

const props: ZkSyncQuestBannerProps = {
  link: 'https://hyperplay.xyz'
}

export const Default: Story = {
  args: { ...props },
  render: (args) => (
    <div style={{ margin: '100px' }}>
      <ZkSyncQuestBanner {...args} />
    </div>
  )
}
