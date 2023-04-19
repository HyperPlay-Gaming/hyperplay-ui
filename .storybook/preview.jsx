import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import '../src/fonts.css'
import '../src/index.scss'

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

export const decorators = [
  (Story) => (
    <>
      <style>{`body { background-color: black; }`}</style>
      <Story />
    </>
  )
]
