import React from 'react'

import { Flex } from '@mantine/core'

import AchievementsInfo from '@/components/AchievementsInfo/index'

export default {
  title: 'Achievements/AchievementsInfo',
  component: AchievementsInfo
}

const achievements = {
  newAchievementsValue: '100K',
  mintedValue: '0/100K',
  gamesValue: '4'
}

export const Default = () => (
  <Flex maw={600}>
    <AchievementsInfo {...achievements} />
  </Flex>
)
