import { HTMLProps } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { LinuxIcon, MacOSIcon, SteamDeckIcon } from '@/assets/images'

import { ContainerIcons } from '.'

const meta: Meta<typeof ContainerIcons> = {
  title: 'Containers/ContainerIcons',
  component: ContainerIcons
}

export default meta

type Story = StoryObj<typeof ContainerIcons>

const props: HTMLProps<HTMLDivElement> = {
  children: (
    <>
      <MacOSIcon fill="white" />
      <LinuxIcon fill="white" />
      <SteamDeckIcon fill="white" />
    </>
  )
}

export const Default: Story = {
  args: { ...props }
}
