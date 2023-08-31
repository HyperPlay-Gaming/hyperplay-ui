import React from 'react'

import Divider from './index'

export default {
  title: 'misc/Divider',
  component: Divider
}

export const Horizontal = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    Text <Divider /> Text
  </div>
)

export const Vertical = () => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
    Text <Divider orientation="vertical" /> Text
  </div>
)
