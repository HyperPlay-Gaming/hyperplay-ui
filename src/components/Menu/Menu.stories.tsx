import { Meta, StoryObj } from '@storybook/react'
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash
} from '@tabler/icons-react'

import Button from '@/components/Button'

import Menu from './index'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    width: 200,
    children: (
      <>
        <Menu.Target>
          <Button size="small" type="secondary">
            Open Menu
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item leftSection={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconMessageCircle size={14} />}>
            Messages
          </Menu.Item>
          <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
            Transfer my data
          </Menu.Item>
          <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </>
    )
  }
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {}
