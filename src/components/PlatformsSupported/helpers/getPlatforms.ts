import { SupportedPlatform } from '@valist/sdk'

import { Platform } from '../../PlatformIcon/types'

function sortPlatforms(platformA: Platform, platformB: Platform) {
  const order = ['windows', 'web', 'darwin', 'linux', 'steamdeck']
  const indexA = order.indexOf(platformA)
  const indexB = order.indexOf(platformB)

  if (indexA < indexB) {
    return -1
  }
  if (indexA > indexB) {
    return 1
  }
  return 0
}

export function getPlatformsFromSupportedPlatforms(
  mapFxn: (platform: SupportedPlatform) => Platform[],
  platforms: SupportedPlatform[]
): Platform[] {
  return Array.from(
    new Set(platforms.flatMap((platform) => mapFxn(platform)))
  ).sort(sortPlatforms)
}
