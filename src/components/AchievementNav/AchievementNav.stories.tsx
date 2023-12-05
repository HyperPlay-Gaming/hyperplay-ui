/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementNav from '.'

export default {
  title: 'Achievements/AchievementNav',
  component: AchievementNav
}

export const gamesAdded = [
  {title: 'Kosium Arctic Eclipse', onGameRemove: ()=>console.log('Removing Kosium!')},
  {title: 'Runescape', onGameRemove: ()=>console.log('Removing Runescape!')},
  {title: 'A Short Hike', onGameRemove: ()=>console.log('Removing A Short Hike!')}
]

export const Default = () => (
  <AchievementNav
    freeMints={10}
    basketAmount={0}
    nextButtonProps={{ onClick: () => console.log('next') }}
    previousButtonProps={{ onClick: () => console.log('previous') }}
    onGameAdd={()=>console.log('Game Added!')}
    gamesAdded={gamesAdded}
    showGameAddButton={false}
  />
)
