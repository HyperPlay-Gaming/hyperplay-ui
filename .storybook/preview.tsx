import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import HyperPlayDesignProvider from '../src/components/HyperPlayDesignProvider'
import './styles.css'

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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story: any) => (
    <HyperPlayDesignProvider>
      <Story />
    </HyperPlayDesignProvider>
  )
]
export const tags = ['autodocs']
