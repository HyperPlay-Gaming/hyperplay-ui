import { SupportedPlatform } from '@valist/sdk'

import { Platform } from '../../PlatformIcon/types'
import { getPlatformsFromSupportedPlatforms } from './getPlatforms'

function getPlayableOn(platform: SupportedPlatform): Platform[] {
  switch (platform) {
    case 'web':
      return ['web', 'windows', 'linux', 'darwin', 'steamdeck']
    case 'darwin_amd64':
    case 'darwin_arm64':
      return ['darwin']
    case 'linux_amd64':
      return ['linux', 'steamdeck']
    case 'linux_arm64':
      return ['linux']
    case 'windows_amd64':
      return ['windows', 'linux', 'darwin', 'steamdeck']
    case 'windows_arm64':
      return ['windows', 'linux', 'darwin']
    case 'android_arm64':
    case 'webgl':
      return []
    default:
      return []
  }
}

export function getPlatformsPlayableOn(
  platforms: SupportedPlatform[]
): Platform[] {
  return getPlatformsFromSupportedPlatforms(getPlayableOn, platforms)
}
