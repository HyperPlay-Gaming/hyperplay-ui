import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import {
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WebIcon,
  WindowsIcon
} from '@/assets/images'

import { CaptionSmall } from '../Typography'
import styles from './GameInfo.module.scss'

export interface GameInfoProps
  extends Omit<HTMLProps<HTMLDivElement>, 'action'> {
  info: Record<string, string>
  platforms: {
    linux: boolean
    mac: boolean
    windows: boolean
    web: boolean
  }
  action?: React.JSX.Element
}

const GameInfo = ({
  info,
  platforms,
  action,
  className,
  ...props
}: GameInfoProps) => {
  return (
    <div className={classNames(className, styles.root)} {...props}>
      <div className={styles.infoSection}>
        <div className={styles.info} style={{ paddingTop: 0 }}>
          {Object.entries(info).map(([key, value]) => (
            <div className={styles.infoItem} key={key}>
              <CaptionSmall className={styles.infoTitle}>{key}</CaptionSmall>
              <CaptionSmall className={styles.infoValue}>{value}</CaptionSmall>
            </div>
          ))}
          <div className={styles.infoItem}>
            <CaptionSmall className={styles.infoTitle}>Platform</CaptionSmall>
            <div className={styles.platformInfo}>
              {platforms.windows && <WindowsIcon style={{ marginRight: 6 }} />}
              {platforms.mac && <MacOSIcon />}
              {platforms.linux && (
                <>
                  <LinuxIcon />
                  <SteamDeckIcon style={{ marginLeft: -6 }} />
                </>
              )}
              {platforms.web && (
                <WebIcon width={20} height={20} style={{ marginLeft: 6 }} />
              )}
            </div>
          </div>
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  )
}

export default GameInfo
