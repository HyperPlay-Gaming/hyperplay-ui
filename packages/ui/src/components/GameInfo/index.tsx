import React from 'react'
import {
  HyperplayStoreIcon,
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WindowsIcon,
  WebIcon
} from '../../assets/images'
import Button from '../Button'
import { CaptionSmall } from '../Typography'

import styles from './GameInfo.module.scss'

export interface GameInfoProps {
  store: 'hyperplay'
  title: string
  info: Record<string, string>
  platforms: {
    linux: boolean
    mac: boolean
    windows: boolean
    web: boolean
  }
  action?: JSX.Element
}

const GameInfo = ({ store, title, info, platforms, action }: GameInfoProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.titleSection}>
        {store === 'hyperplay' && (
          <HyperplayStoreIcon className={styles.storeIcon} />
        )}
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.infoSection}>
        {action && <div className={styles.action}>{action}</div>}
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
      </div>
    </div>
  )
}

export default GameInfo
