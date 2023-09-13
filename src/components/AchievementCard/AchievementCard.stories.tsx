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
      mintableAchievementsCount={10}
      totalAchievementsCount={30}
      data-testid="1"
      infoText="Information about progress."
    />
  </Flex>
)

export const NewAchievement = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Diablo II"
      mintedAchievementsCount={5}
      mintableAchievementsCount={10}
      totalAchievementsCount={15}
      data-testid="1"
      infoText="Information about progress."
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
      mintableAchievementsCount={10}
      totalAchievementsCount={15}
      data-testid="1"
      infoText="Information about progress."
    />
  </Flex>
)

export const LongName = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Star Wars: Knights of the Old Republic"
      mintedAchievementsCount={5}
      mintableAchievementsCount={10}
      totalAchievementsCount={13}
      data-testid="1"
      infoText="Information about progress."
    />
  </Flex>
)

export const NegativeAchievements = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Star Wars: Knights of the Old Republic"
      mintedAchievementsCount={5}
      mintableAchievementsCount={10}
      totalAchievementsCount={-5}
      data-testid="1"
      infoText="Information about progress."
    />
  </Flex>
)
export const Disabled = () => (
  <Flex maw={300}>
    <AchievementCard
      image="https://i.imgur.com/Cij5vdL.png"
      title="Star Wars: Knights of the Old Republic"
      mintedAchievementsCount={5}
      mintableAchievementsCount={10}
      totalAchievementsCount={-5}
      data-testid="1"
      infoText="Information about progress."
      ctaProps={{ disabled: true }}
    />
  </Flex>
)
