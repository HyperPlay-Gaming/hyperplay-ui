import React, { useState } from 'react'

import { StoryObj } from '@storybook/react'

import OptionsAccordion from '.'

export default {
  title: 'OptionsAccordion',
  component: OptionsAccordion
}

type OptionsType = { [key: string]: boolean }
const Genre: OptionsType = {
  Action: false,
  Adventure: false,
  'Role-Playing': false,
  Strategy: false,
  Simulation: false,
  Sports: false,
  Racing: false
}

const Systems: OptionsType = {
  Windows: false,
  Mac: false,
  Linux: false,
  Browser: false
}

const Version: OptionsType = {
  Alpha: false,
  Beta: false,
  Stable: false
}

const Others: OptionsType = {
  'Token required': false,
  Downloaded: false,
  'Show hidden': false,
  'Show non-available': false
}

const Scrollable: OptionsType = Object.fromEntries(
  Array.from({ length: 25 }, (_, i) => [`Item${i + 1}`, false])
)

const defaultAllFilters: { [key: string]: OptionsType } = {
  Genre,
  Systems,
  Version,
  Others,
  Scrollable
}

type Props = {
  options?: { [key: string]: OptionsType }
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
    return <OptionsAccordion options={options} setOptions={state[1]} />
  }
}
