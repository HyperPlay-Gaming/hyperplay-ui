import { SupportedPlatform } from '@valist/sdk'

import { LinuxIcon, MacOSIcon, WebIcon, WindowsIcon } from '@/assets/images'

export interface PlatformIconProps extends React.SVGAttributes<SVGElement> {
  platform: SupportedPlatform
}

export function PlatformIcon({ platform, ...props }: PlatformIconProps) {
  switch (platform) {
    case 'web':
      return <WebIcon {...props} />
    case 'darwin_amd64':
    case 'darwin_arm64':
      return <MacOSIcon {...props} />
    case 'linux_amd64':
    case 'linux_arm64':
      return <LinuxIcon {...props} />
    case 'windows_amd64':
    case 'windows_arm64':
      return <WindowsIcon {...props} />
    case 'android_arm64':
    case 'webgl':
      return null
    default:
      return null
  }
}
