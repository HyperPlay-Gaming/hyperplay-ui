import React from 'react'

import GameCard from '.'

export default {
  title: 'GameCard'
}

export const Default = () => <GameCard title="Test Game"></GameCard>
export const LongTitle = () => (
  <GameCard title="Test Game with a Really Long Title"></GameCard>
)
