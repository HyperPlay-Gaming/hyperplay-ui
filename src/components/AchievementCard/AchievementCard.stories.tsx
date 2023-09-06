import { Flex } from '@mantine/core'

import AchievementCard from '.'

export default {
  title: 'AchievementCard',
  component: AchievementCard
}

export const Default = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Diablo II"
      mintableAchievementsCount={10}
      mintedAchievementsCount={5}
      totalAchievementsCount={15}
      data-testid="1"
    />
  </Flex>
)
