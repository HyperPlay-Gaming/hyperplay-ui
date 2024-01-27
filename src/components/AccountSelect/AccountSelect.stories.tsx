import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import AccountSelect, { AccountSelectProps } from './index'

const meta: Meta<typeof AccountSelect> = {
  title: 'DevPortal/AccountSelect',
  component: AccountSelect
}

export default meta

type Story = StoryObj<typeof AccountSelect>

const props: AccountSelectProps = {
  name: 'Name',
  value: '123',
  href: 'https://youtube.com',
  onChange: (name: string) => console.log(name),
  children: <div>Child</div>
}

export const Simple: Story = {
  args: { ...props },
  render: (args) => {
    const [value, setValue] = useState('test-1')
    return (
      <AccountSelect {...args} value={value} onChange={setValue}>
        <AccountSelect.Option value="test-1" name="test-1" />
        <AccountSelect.Option value="test-2" name="test-2" />
        <AccountSelect.Option value="test-3" name="test-3" label="1 project" />
        <AccountSelect.Option value="test-4" name="test-4" label="1 project" />
        <AccountSelect.Option value="test-5" name="test-5" label="1 project" />
        <AccountSelect.Option value="test-6" name="test-6" label="1 project" />
        <AccountSelect.Option value="test-7" name="test-7" label="1 project" />
        <AccountSelect.Option value="test-8" name="test-8" label="1 project" />
      </AccountSelect>
    )
  }
}

export const Large: Story = {
  args: { ...props },
  render: (args) => {
    const [value, setValue] = useState('test-1')
    return (
      <AccountSelect {...args} value={value} onChange={setValue}>
        <AccountSelect.Option value="test-1" name="test-1" large />
        <AccountSelect.Option value="test-2" name="test-2" large />
        <AccountSelect.Option value="test-3" name="test-3" large />
        <AccountSelect.Option value="test-4" name="test-4" large />
        <AccountSelect.Option value="test-5" name="test-5" large />
        <AccountSelect.Option value="test-6" name="test-6" large />
        <AccountSelect.Option value="test-7" name="test-7" large />
        <AccountSelect.Option value="test-8" name="test-8" large />
      </AccountSelect>
    )
  }
}
