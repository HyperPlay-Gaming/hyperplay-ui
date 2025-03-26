import {
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WebIcon,
  WindowsIcon
} from '@/assets/images'

import { Platform } from '../../types'

export interface PlatformIconProps extends React.SVGAttributes<SVGElement> {
  platform: Platform
}

export function PlatformIcon({ platform, ...props }: PlatformIconProps) {
  switch (platform) {
    case 'web':
      return <WebIcon {...props} />
    case 'darwin':
      return <MacOSIcon {...props} />
    case 'linux':
      return <LinuxIcon {...props} />
    case 'windows':
      return <WindowsIcon {...props} />
    case 'steamdeck':
      return <SteamDeckIcon {...props} />
    default:
      return null
  }
}
