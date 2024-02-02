import type { Meta, StoryObj } from '@storybook/react'

import { Ellipsis } from '@/assets/images'

import { ContainerInteractive, ContainerInteractiveProps } from '.'
import Sticker from '../Sticker'

const meta: Meta<typeof ContainerInteractive> = {
  title: 'Containers/ContainerInteractive',
  component: ContainerInteractive
}

export default meta

type Story = StoryObj<typeof ContainerInteractive>

const props: ContainerInteractiveProps = {
  children: <h1>Hello</h1>,
  title: 'A title',
  icon: (
    <button onClick={() => console.log('interacted!')}>
      <Ellipsis fill="white" />
    </button>
  )
}

export const Default: Story = {
  args: { ...props }
}

export const WithTag: Story = {
  args: {
    ...props,
    tag: (
      <Sticker styleType="secondary" variant="filled">
        Sticker
      </Sticker>
    )
  }
}
