import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import '../src/fonts.css'
import '../src/index.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [(Story) => <Story />]
