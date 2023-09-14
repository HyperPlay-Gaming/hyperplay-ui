export interface AchievementProgressProps {
  /**
   * The total number of achievements that a user is able to mint for this game
   */
  mintableAchievementsCount: number
  /**
   * The number of achievements that have been minted by the user for this game
   */
  mintedAchievementsCount: number
  /**
   * The total number of achievements that exist for this game
   */
  totalAchievementsCount: number
}

export default function getProgress({
  mintableAchievementsCount,
  mintedAchievementsCount,
  totalAchievementsCount
}: AchievementProgressProps) {
  const safeMintedCount = mintedAchievementsCount || 0
  const safeTotalCount = totalAchievementsCount > 0 ? totalAchievementsCount : 0

  const mintedProgress =
    safeTotalCount > 0
      ? Math.round((mintedAchievementsCount / safeTotalCount) * 100)
      : 0
  const mintableProgress =
    safeTotalCount > 0
      ? Math.round(
          (mintableAchievementsCount / safeTotalCount) * 100 - mintedProgress
        )
      : 0

  return { mintedProgress, mintableProgress, safeMintedCount, safeTotalCount }
}
