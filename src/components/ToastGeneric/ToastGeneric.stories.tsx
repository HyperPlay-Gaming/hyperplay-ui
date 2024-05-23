import type { Meta, StoryObj } from '@storybook/react'

import { TxnSuccess } from '@/assets/images'

import { ToastGeneric, ToastGenericProps } from '.'

const meta: Meta<typeof ToastGeneric> = {
  title: 'ToastGeneric',
  component: ToastGeneric
}

export default meta

type Story = StoryObj<typeof ToastGeneric>

const props: ToastGenericProps = {
  title: 'Transaction request pending',
  subtext: 'A wallet confirmation is pending on your mobile wallet.',
  onClick: () => console.log('close clicked!'),
  showCloseButton: true,
  image: <TxnSuccess />
}

export const Default: Story = {
  args: { ...props }
}
