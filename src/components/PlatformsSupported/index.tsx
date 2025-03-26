import { HTMLAttributes } from 'react'

import { SupportedPlatform } from '@valist/sdk'

import { ContainerIcons } from '../ContainerIcons'
import { ContainerRaised } from '../ContainerRaised'
import { PlatformIcon } from './components/PlatformIcon'
import { getPlatformsBuiltFor } from './helpers/getBuiltFor'
import { getPlatformsPlayableOn } from './helpers/getPlayableOn'
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
    getPlatformsBuiltFor(platformsWithBuilds).forEach((platform) =>
      builtForIcons.push(<PlatformIcon platform={platform} />)
    )
    getPlatformsPlayableOn(platformsWithBuilds).forEach((platform) =>
      playableOnIcons.push(<PlatformIcon platform={platform} />)
    )
  }

  let builtFor = null
  if (builtForIcons.length) {
    builtFor = (
      <ContainerRaised>
        <div className="title-sm">{i18n.builtFor}</div>
        <ContainerIcons>{builtForIcons}</ContainerIcons>
        <div className="eyebrow">{i18n.optimizedFor}</div>
      </ContainerRaised>
    )
  }

  let playableOn = null
  if (playableOnIcons.length) {
    playableOn = (
      <ContainerRaised useGradientBorder={true}>
        <div className="title-sm">{i18n.playableOn}</div>
        <ContainerIcons>{playableOnIcons}</ContainerIcons>
        <div className="eyebrow">{i18n.noExtraSetupNeeded}</div>
      </ContainerRaised>
    )
  }

  return (
    <div className={styles.root} {...props}>
      {builtFor}
      {playableOn}
    </div>
  )
}
