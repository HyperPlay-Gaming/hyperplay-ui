import React from 'react'
import '../src/index.scss'
import '@fontsource/rajdhani'
import '@fontsource/barlow'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Story />
  )
]