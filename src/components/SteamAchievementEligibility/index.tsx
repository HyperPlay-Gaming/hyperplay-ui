import Alert from '../Alert'
import AssociatedGamesCollapse, {
  AssociatedGamesCollapseProps
} from '../AssociatedGamesCollapse'

export interface SteamAchievementEligibilityTranslations {
  linkSteamAccount: string
  connectSteamAccount: string
  needMoreAchievements: string
}

export interface SteamAchievementEligibilityProps {
  gamesCollapseProps: AssociatedGamesCollapseProps
  steamAccountIsLinked?: boolean
  i18n?: SteamAchievementEligibilityTranslations
  needMoreAchievements?: boolean
}

export function SteamAchievementEligibility({
  gamesCollapseProps,
  steamAccountIsLinked,
  needMoreAchievements,
  i18n = {
    linkSteamAccount: 'Link your Steam account to check eligibility.',
    needMoreAchievements:
      'You need to have completed 15% of the achievements in one of these games.',
    connectSteamAccount: 'Connect Steam account'
  }
}: SteamAchievementEligibilityProps) {
  let needMoreAchievementsText = <></>
  if (needMoreAchievements) {
    needMoreAchievementsText = <Alert message={i18n.needMoreAchievements} />
  }
  let linkSteamAccountText = <></>
  if (steamAccountIsLinked) {
    linkSteamAccountText = <Alert message={i18n.linkSteamAccount} />
  }
  return (
    <>
      <AssociatedGamesCollapse {...gamesCollapseProps} />
      {linkSteamAccountText}
      {needMoreAchievementsText}
    </>
  )
}
