import {
  Box,
  Card,
  Flex,
  Image,
  ImageProps,
  Progress,
  Text
} from '@mantine/core'

import * as Images from '@/assets/images'

import Button, { ButtonProps } from '../Button'
import { Title } from '../Typography'

interface AchievementCardProps {
  image: string
  title: string
  /**
   * The number of achievements that have been minted by the user for this game
   */
  mintedAchievementsCount: number
  /**
   * The total number of achievements that a user is able to mint for this game
   */
  mintableAchievementsCount: number
  /**
   * The total number of achievements that exist for this game
   */
  totalAchievementsCount: number
  /**
   * Props to pass to the image component
   */
  imageProps?: ImageProps
  /**
   * Props to pass to the CTA button
   */
  ctaProps?: ButtonProps
}

export default function AchievementCard({
  image,
  title,
  imageProps = {},
  ctaProps = {},
  mintedAchievementsCount,
  mintableAchievementsCount,
  totalAchievementsCount,
  ...others
}: AchievementCardProps &
  ImageProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof AchievementCardProps>) {
  const mintedProgress = Math.round(
    (mintedAchievementsCount / totalAchievementsCount) * 100
  )
  const mintableProgress = Math.round(
    (mintableAchievementsCount / totalAchievementsCount) * 100 - mintedProgress
  )

  return (
    <Card radius="md" pos="relative" bg="var(--color-neutral-700)" {...others}>
      <Card.Section>
        <Image src={image} height={180} {...imageProps} />
      </Card.Section>

      <Box pos="absolute" top={8} right={8}>
        <Button size="icon" type="secondary" {...ctaProps}>
          <Images.PlusCircleOutline fill="white" height={24} width={24} />
        </Button>
      </Box>

      <Box pt={8}>
        <Title className="color-neutral-100">{title}</Title>

        <Flex align="center">
          <Flex direction="column" gap={4} w="100%">
            <Flex>
              <Text className="body-sm" color="var(--color-success-400)">
                {mintedAchievementsCount}
              </Text>
              <Text className="bodySm" color="var(--color-neutral-400)" mx={2}>
                /
              </Text>
              <Text className="bodySm" color="var(--color-neutral-400)">
                {totalAchievementsCount}
              </Text>
              <Text className="bodySm" color="var(--color-neutral-400)" ml={4}>
                achievements minted
              </Text>
            </Flex>
            <Progress
              bg="var(--color-neutral-600)"
              sections={[
                {
                  value: mintedProgress,
                  color: 'var(--color-success-400)'
                },
                {
                  value: mintableProgress,
                  color: 'var(--color-success-400-20)'
                }
              ]}
            />
          </Flex>
          <Flex ml="sm">
            <Images.Info
              height={16}
              width={16}
              fill="var(--color-neutral-400)"
            />
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}
