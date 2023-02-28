import React from 'react'
import GameInfo from '.'

export default {
  title: 'GameInfo',
  component: GameInfo
}

export const Default = () => (
  <GameInfo
    onActionClick={() => console.log('clicked')}
    store="hyperplay"
    title="Hyperplay"
    info={{
      'Release Date': '2020-10-10',
      Developer: 'Hyperplay',
      Publisher: 'Hyperplay',
      Genre: 'Action',
      Language: 'English'
    }}
    hideActionButton={true}
    platforms={{
      linux: true,
      mac: true,
      windows: true,
      web: true
    }}
  />
)
