import { HTMLAttributes } from 'react'

import { SupportedPlatform } from '@valist/sdk'

import { ContainerIcons } from '../ContainerIcons'
import { ContainerRaised } from '../ContainerRaised'
import { PlatformIcon } from './components/PlatformIcon'
import styles from './index.module.scss'

export interface PlatformsSupportedProps
  extends HTMLAttributes<HTMLDivElement> {
  platformsWithBuilds: SupportedPlatform[]
  i18n?: {
    builtFor?: string
    playableOn?: string
    optimizedFor?: string
    noExtraSetupNeeded?: string
    compatibilityInfoMessage?: string
  }
}

export function PlatformsSupported({
  platformsWithBuilds,
  i18n = {
    builtFor: 'Built for:',
    playableOn: 'Playable on:',
    optimizedFor: 'Optimized for',
    noExtraSetupNeeded: 'No Extra Setup Needed',
    compatibilityInfoMessage:
      "HyperPlay's compatibility layer allows gameplay on these platforms."
  },
  ...props
}: PlatformsSupportedProps) {
  const builtForIcons: React.ReactNode[] = []
  const playableOnIcons: React.ReactNode[] = []
  if (platformsWithBuilds.length) {
    for (const platformWithBuild of platformsWithBuilds) {
      builtForIcons.push(<PlatformIcon platform={platformWithBuild} />)
    }
  }

  return (
    <div className={styles.root} {...props}>
      <ContainerRaised>
        <div className="title-sm">{i18n.builtFor}</div>
        <ContainerIcons>{builtForIcons}</ContainerIcons>
        <div className="eyebrow">{i18n.optimizedFor}</div>
      </ContainerRaised>
      <ContainerRaised useGradientBorder={true}>
        <div className="title-sm">{i18n.playableOn}</div>
        <ContainerIcons>{playableOnIcons}</ContainerIcons>
        <div className="eyebrow">{i18n.noExtraSetupNeeded}</div>
      </ContainerRaised>
    </div>
  )
}
