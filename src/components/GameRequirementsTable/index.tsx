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
  classnames?: {
    container?: string
    title?: string
    item?: string
    table?: string
  }
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
      <h1 className={classNames('title', styles.title, classnames?.title)}>
        Recommended
      </h1>
      <table className={classNames(styles.table, classnames?.table)}>
        <tbody>
          <tr className={classNames(styles.item, classnames?.item)}>
            <td className={classNames('caption', styles.item__title)}>OS</td>
            <td className={classNames('caption', styles.item__value)}>
              <SupportedPlatforms platforms={requirements.platforms} />
            </td>
          </tr>
          <tr className={classNames(styles.item, classnames?.item)}>
            <td className={classNames('caption', styles.item__title)}>
              Processor
            </td>
            <td className={classNames('caption', styles.item__value)}>
              {requirements.cpu}
            </td>
          </tr>
          <tr className={classNames(styles.item, classnames?.item)}>
            <td className={classNames('caption', styles.item__title)}>
              Memory
            </td>
            <td className={classNames('caption', styles.item__value)}>
              {requirements.memory}
            </td>
          </tr>
          <tr className={classNames(styles.item, classnames?.item)}>
            <td className={classNames('caption', styles.item__title)}>
              Graphics
            </td>
            <td className={classNames('caption', styles.item__value)}>
              {requirements.gpu}
            </td>
          </tr>
          <tr className={classNames(styles.item, classnames?.item)}>
            <td className={classNames('caption', styles.item__title)}>
              Storage
            </td>
            <td className={classNames('caption', styles.item__value)}>
              {requirements.disk}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GameRequirementsTable
