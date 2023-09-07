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
      mintedAchievementsCount={5}
      totalAchievementsCount={0}
      data-testid="1"
    />
  </Flex>
)

export const NewAchievement = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Diablo II"
      mintedAchievementsCount={5}
      totalAchievementsCount={15}
      data-testid="1"
      isNewAchievement
    />
  </Flex>
)

export const BrokenImage = () => (
  <Flex maw={300}>
    <AchievementCard
      image="brokenImage"
      title="Diablo II"
      mintedAchievementsCount={5}
      totalAchievementsCount={0}
      data-testid="1"
    />
  </Flex>
)
