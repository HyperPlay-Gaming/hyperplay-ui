import React from 'react'
import '../src/index.scss'
import '../src/fonts.css'
import 'react-loading-skeleton/dist/skeleton.css'

try {
  import('@hyperplay/proprietary-fonts')
} catch (e) {
  console.warn('Proprietary fonts could not be loaded')
}

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
