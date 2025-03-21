import { HTMLProps } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { LinuxIcon, MacOSIcon, SteamDeckIcon } from '@/assets/images'

import { ContainerRaised } from '.'
import { ContainerIcons } from '../ContainerIcons'

const meta: Meta<typeof ContainerRaised> = {
  title: 'Containers/ContainerRaised',
  component: ContainerRaised
}

export default meta

type Story = StoryObj<typeof ContainerRaised>

const props: HTMLProps<HTMLDivElement> = {
  children: (
    <>
      <div className="title-sm">Playable on:</div>
      <ContainerIcons>
        <MacOSIcon fill="white" />
        <LinuxIcon fill="white" />
        <SteamDeckIcon fill="white" />
      </ContainerIcons>
      <div className="eyebrow">No Extra Setup Needed</div>
    </>
  )
}

export const Default: Story = {
  args: { ...props }
}

export const WithGradientBorder: Story = {
  args: { ...props, useGradientBorder: true }
}
