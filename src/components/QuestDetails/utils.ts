import { Eligbility } from './types'

export function isEligible(eligibility: Eligbility) {
  let isEligible = false
  eligibility.reputation?.games.forEach((val) => {
    if (
      eligibility.reputation?.completionPercent &&
      (val.mintedAchievementsCount / val.totalAchievementsCount) * 100 >
        eligibility.reputation?.completionPercent
    ) {
      isEligible = true
    }
  })
  return isEligible
}

export function replacePercentInString(text: string, percent: number) {
  return text.replace('{{percent}}', percent.toString() ?? '??')
}
