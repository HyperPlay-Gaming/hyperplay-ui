import React from 'react'

import { SystemRequirements } from '@valist/sdk/dist/typesShared'
import classNames from 'classnames'

import {
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WebIcon,
  WindowsIcon
} from '@/assets/images'

import styles from './GameRequirementsTable.module.scss'

interface Requirements extends SystemRequirements {
  platforms: {
    linux: boolean
    mac: boolean
    windows: boolean
    web: boolean
  }
}

export interface GameRequirementsTableProps {
  requirements: Requirements
  classnames?: { container?: string; title?: string; item?: string }
}

const SupportedPlatforms = ({
  platforms
}: {
  platforms: Requirements['platforms']
}) => {
  return (
    <div className={styles.icons}>
      {platforms.windows && <WindowsIcon />}
      {platforms.mac && <MacOSIcon />}
      {platforms.linux && (
        <>
          <LinuxIcon />
          <SteamDeckIcon />
        </>
      )}
      {platforms.web && <WebIcon width={20} height={20} />}
    </div>
  )
}

const GameRequirementsTable = ({
  requirements,
  classnames
}: GameRequirementsTableProps) => {
  return (
    <div className={classNames(styles.container, classnames?.container)}>
      <h1 className={classNames('title-sm', styles.title, classnames?.title)}>
        Recommended
      </h1>
      <div className={classNames(styles.item, classnames?.item)}>
        <span className={classNames('caption', styles.item__title)}>OS</span>
        <span className={classNames('caption', styles.item__value)}>
          <SupportedPlatforms platforms={requirements.platforms} />
        </span>
      </div>
      <div className={classNames(styles.item, classnames?.item)}>
        <span className={classNames('caption', styles.item__title)}>
          Processor
        </span>
        <span className={classNames('caption', styles.item__value)}>
          {requirements.cpu}
        </span>
      </div>
      <div className={classNames(styles.item, classnames?.item)}>
        <span className={classNames('caption', styles.item__title)}>
          Memory
        </span>
        <span className={classNames('caption', styles.item__value)}>
          {requirements.memory}
        </span>
      </div>
      <div className={classNames(styles.item, classnames?.item)}>
        <span className={classNames('caption', styles.item__title)}>
          Graphics
        </span>
        <span className={classNames('caption', styles.item__value)}>
          {requirements.gpu}
        </span>
      </div>
      <div className={classNames(styles.item, classnames?.item)}>
        <span className={classNames('caption', styles.item__title)}>
          Storage
        </span>
        <span className={classNames('caption', styles.item__value)}>
          {requirements.disk}
        </span>
      </div>
    </div>
  )
}

export default GameRequirementsTable
