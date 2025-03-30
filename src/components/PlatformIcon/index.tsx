import {
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WebIcon,
  Windows11Icon
} from '@/assets/images'

import { Platform } from './types'

export interface PlatformIconProps extends React.SVGAttributes<SVGElement> {
  platform: Platform
}

/**
 * @dev By abstracting this into a component, we only need to update this component when
 * platform icons change (e.g. the Windows icon changes on almost every new version).
 */
export function PlatformIcon({ platform, ...props }: PlatformIconProps) {
  switch (platform) {
    case 'web':
      return <WebIcon {...props} />
    case 'darwin':
      return <MacOSIcon {...props} />
    case 'linux':
      return <LinuxIcon {...props} />
    case 'windows':
      return <Windows11Icon {...props} />
    case 'steamdeck':
      return <SteamDeckIcon {...props} />
    default:
      return null
  }
}
