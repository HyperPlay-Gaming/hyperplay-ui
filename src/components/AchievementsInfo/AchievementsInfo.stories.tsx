import React from 'react'

import { Flex } from '@mantine/core'

import AchievementsInfo from '@/components/AchievementsInfo/index'

export default {
  title: 'AchievementsInfo',
  component: AchievementsInfo
}

const achievements = {
  newAchievements: '100K',
  minted: '0/100K',
  games: '4'
}

export const Default = () => (
  <Flex maw={600}>
    <AchievementsInfo {...achievements} />
  </Flex>
)
