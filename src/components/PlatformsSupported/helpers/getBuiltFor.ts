import { SupportedPlatform } from '@valist/sdk'

import { Platform } from '../types'

export function getPlatformsBuiltFor(
  platforms: SupportedPlatform[]
): Platform[] {
  return Array.from(
    new Set(platforms.flatMap((platform) => getBuiltFor(platform)))
  )
}

function getBuiltFor(platform: SupportedPlatform): Platform[] {
  switch (platform) {
    case 'web':
      return ['web']
    case 'darwin_amd64':
    case 'darwin_arm64':
      return ['darwin']
    case 'linux_amd64':
      return ['linux', 'steamdeck']
    case 'linux_arm64':
      return ['linux']
    case 'windows_amd64':
    case 'windows_arm64':
      return ['windows']
    case 'android_arm64':
    case 'webgl':
      return []
    default:
      return []
  }
}
