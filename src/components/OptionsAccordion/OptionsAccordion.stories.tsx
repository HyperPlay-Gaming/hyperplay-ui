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

const defaultAllFilters: { [key: string]: OptionsType } = {
  Genre: Genre,
  Systems: Systems,
  Version: Version,
  Others: Others
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
    const [currentOptions, setOptions] = useState(options)
    return <OptionsAccordion options={currentOptions} setOptions={setOptions} />
  }
}
