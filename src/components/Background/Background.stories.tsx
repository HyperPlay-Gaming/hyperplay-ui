import React from 'react'

import Background from '.'

export default {
  title: 'Background',
  component: Background
}

export const Default = () => (
  <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
    <Background></Background>
  </div>
)
