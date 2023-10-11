import React from 'react'

import GameInfo from '.'
import Button from '../Button'

export default {
  title: 'GameInfo',
  component: GameInfo
}

export const Default = () => (
  <GameInfo
    info={{
      'Release Date': '2020-10-10',
      Developer: 'Hyperplay',
      Publisher: 'Hyperplay',
      Genre: 'Action',
      Language: 'English'
    }}
    platforms={{
      linux: true,
      mac: true,
      windows: true,
      web: true
    }}
    action={<Button>Add to Library</Button>}
  />
)
