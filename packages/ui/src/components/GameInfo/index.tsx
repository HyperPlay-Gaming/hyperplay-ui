import React from 'react'
import {
  HyperplayStoreIcon,
  LinuxIcon,
  MacOSIcon,
  SteamDeckIcon,
  WindowsIcon
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
  }
  onActionClick?: () => void
}

const GameInfo = ({ store, title, info, platforms }: GameInfoProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.titleSection}>
        {store === 'hyperplay' && (
          <HyperplayStoreIcon className={styles.storeIcon} />
        )}
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.infoSection}>
        <Button fullWidth={true}>Add to Library</Button>

        <div className={styles.info}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameInfo
