import React from 'react'

import Background from '.'

export default {
  title: 'Background',
  component: Background
}

export const Default = () => (
  <div style={{ position: 'relative' }}>
    <Background></Background>
  </div>
)
// create story for ./index.tsx
