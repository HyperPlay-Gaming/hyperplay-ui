import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import { MantineProvider } from '@mantine/core'

import '../src/fonts.css'
import '../src/index.scss'

export const parameters = {
  backgrounds: {
    default: 'darkBlue',
    values: [
      { name: 'darkBlue', value: '#11111D' },
      { name: 'dark', value: '#0C0B0F' },
      { name: 'light', value: '#FFFFFF' },
      { name: '600', value: '#282B34' }
    ]
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => (
    <MantineProvider>
      <Story />
    </MantineProvider>
  )
]
