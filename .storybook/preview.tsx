import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import { Preview } from '@storybook/react'

import HyperPlayDesignProvider from '../src/components/HyperPlayDesignProvider'
import './styles.css'
import { ALL_VIEWPORTS } from './viewports'

export const preview: Preview = {
  parameters: {
    viewports: {
      viewports: ALL_VIEWPORTS,
      defaultViewport: 'desktop'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'darkBlue',
      values: [
        { name: 'darkBlue', value: '#11111D' },
        { name: 'dark', value: '#0C0B0F' },
        { name: 'light', value: '#FFFFFF' },
        { name: '600', value: '#282B34' }
      ]
    },
    layout: 'fullscreen'
  },
  decorators: [
    (Story: any) => (
      <HyperPlayDesignProvider>
        <Story />
      </HyperPlayDesignProvider>
    )
  ],
  tags: ['autodocs']
}

export default preview
