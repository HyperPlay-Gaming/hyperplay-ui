import React, { HTMLProps } from 'react'

import { Stack } from '@mantine/core'
import classNames from 'classnames'

import LinuxIcon from '@/assets/platformIcons/linux-icon.png'
import MacIcon from '@/assets/platformIcons/mac-icon.png'
import WebIcon from '@/assets/platformIcons/web-icon.png'
import WindowsIcon from '@/assets/platformIcons/windows-icon.png'
import { Platforms, platformLabels } from '@/common/types'

import styles from './PlatformContainer.module.scss'

export interface PlatformContainerProps extends HTMLProps<HTMLDivElement> {
  platformName: Platforms
}

const platformImages: Record<Platforms, string> = {
  windows: WindowsIcon,
  linux: LinuxIcon,
  darwin: MacIcon,
  web: WebIcon
}

export function PlatformContainer({
  platformName,
  children,
  className,
  ...props
}: PlatformContainerProps): React.JSX.Element {
  const platformDisplayName = platformLabels[platformName]
  const platformIcon = platformImages[platformName]

  return (
    <div className={classNames(styles.root, className)} {...props}>
      <Stack>
        <img src={platformIcon} alt={platformName} className={styles.image} />
        <div className={classNames('title', styles.title)}>
          {platformDisplayName}
        </div>
      </Stack>
      {children}
    </div>
  )
}
