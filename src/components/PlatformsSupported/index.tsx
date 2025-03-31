import { HTMLAttributes } from 'react'

import { Tooltip } from '@mantine/core'
import { SupportedPlatform } from '@valist/sdk'
import classNames from 'classnames'

import { Info } from '@/assets/images'

import { ContainerIcons } from '../ContainerIcons'
import { ContainerRaised } from '../ContainerRaised'
import { PlatformIcon } from '../PlatformIcon'
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
    playableOn: 'Also Playable on:',
    optimizedFor: 'Optimized for These Platform(s)',
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
      <ContainerRaised
        data-testid={'platforms-supported-built-for-container'}
        classNames={{ container: styles.containerRaised }}
      >
        <div className="title-sm">{i18n.builtFor}</div>
        <ContainerIcons>{builtForIcons}</ContainerIcons>
        <div className="eyebrow">{i18n.optimizedFor}</div>
      </ContainerRaised>
    )
  }

  let playableOn = null
  if (playableOnIcons.length) {
    playableOn = (
      <ContainerRaised
        useGradientBorder={true}
        data-testid={'platforms-supported-playable-on-container'}
        classNames={{ container: styles.containerRaised }}
      >
        <div className="title-sm">{i18n.playableOn}</div>
        <ContainerIcons>{playableOnIcons}</ContainerIcons>
        <div className={styles.noSetupContainer}>
          <div className="eyebrow">{i18n.noExtraSetupNeeded}</div>
          <Tooltip
            label={i18n.compatibilityInfoMessage}
            arrowSize={14}
            withArrow
            position="bottom"
            classNames={{ tooltip: classNames('caption', styles.tooltip) }}
            data-testid={'platforms-supported-info-popover'}
            withinPortal={false}
          >
            <div
              className={styles.infoIconContainer}
              data-testid={'platforms-supported-info-icon'}
            >
              <Info />
            </div>
          </Tooltip>
        </div>
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
