import React, { useState } from 'react'

import { StoryObj } from '@storybook/react'

import OptionsAccordion, { OptionsType, PanelOptions } from '.'

export default {
  title: 'OptionsAccordion',
  component: OptionsAccordion
}

const Genre: PanelOptions = {
  Action: { selected: false },
  Adventure: { selected: false },
  'Role-Playing': { selected: false },
  Strategy: { selected: false },
  Simulation: { selected: false },
  Sports: { selected: false },
  Racing: { selected: false }
}

const Systems: PanelOptions = {
  Windows: { selected: false },
  Mac: { selected: false },
  Linux: { selected: false },
  Browser: { selected: false }
}

const Version: PanelOptions = {
  Alpha: { selected: false },
  Beta: { selected: false },
  Stable: { selected: false }
}

const Others: PanelOptions = {
  'Token required': { selected: false },
  Downloaded: { selected: false },
  'Show hidden': { selected: false },
  'Show non-available': { selected: false }
}

const Chains: PanelOptions = {
  1: { selected: false, displayName: 'Ethereum Mainnet' },
  2: { selected: false, displayName: 'Some Other Chain' },
  1010101: { selected: false, displayName: 'Another Chain' },
  1231123: { selected: false }
}

const Scrollable: PanelOptions = Object.fromEntries(
  Array.from({ length: 25 }, (_, i) => [`Item${i + 1}`, { selected: false }])
)

const defaultAllFilters: OptionsType = {
  Genre,
  Systems,
  Version,
  Others,
  Scrollable,
  Chains
}

type Props = {
  options?: OptionsType
}

type Story = StoryObj<typeof OptionsAccordion>

export const Default: Story = {
  argTypes: {
    options: {
      control: 'object'
    }
  },
  render: ({ options = defaultAllFilters }: Props) => {
    const state = useState(options)
    return (
      <OptionsAccordion options={defaultAllFilters} setOptions={state[1]} />
    )
  }
}
