import React from 'react'

import * as Images from '../../../../assets/images'
import styles from '../../GameCard.module.scss'
import actionStyles from './index.module.scss'
import classNames from 'classnames'
import { SupportedPlatform } from '@valist/sdk'

type ActionBarProps = {
  title: string
  onSettingsClick: React.MouseEventHandler<HTMLButtonElement>
  onFavoriteClick: React.MouseEventHandler<HTMLButtonElement>
  onActionClick: React.MouseEventHandler<HTMLButtonElement>
  icon: React.JSX.Element
  favorited?: boolean
  showSettings: boolean
  actionDisabled?: boolean
  platformsAvailable?: SupportedPlatform[]
}

const ActionBar = ({
  title,
  onSettingsClick,
  onFavoriteClick,
  onActionClick,
  icon,
  favorited,
  showSettings,
  actionDisabled = false,
  platformsAvailable
}: ActionBarProps) => {
  const platformIcons: React.ReactNode[] = []
  if (platformsAvailable?.some((val) => val.includes('darwin'))) {
    platformIcons.push(<Images.MacOSIcon fill="white" />)
  }
  if (platformsAvailable?.some((val) => val.includes('linux'))) {
    platformIcons.push(<Images.LinuxIcon fill="white" />)
  }
  if (platformsAvailable?.some((val) => val.includes('windows'))) {
    platformIcons.push(<Images.Windows11Icon fill="white" />)
  }
  if (platformsAvailable?.some((val) => val === 'web')) {
    platformIcons.push(<Images.WebIcon fill="white" />)
  }
  return (
    <>
      <div className={styles.bottomSection}>
        <div className={classNames(styles.title, 'title-sm')}>{title}</div>
        <div className={actionStyles.platformIconsContainer}>
          {...platformIcons}
        </div>
      </div>
      <div className={styles.actionButtonContainer}>
        <button style={{ paddingLeft: '0px' }} onClick={onSettingsClick}>
          <Images.Ellipsis
            fill={
              showSettings
                ? 'var(--color-primary-300)'
                : 'var(--color-neutral-100)'
            }
          ></Images.Ellipsis>
        </button>
        <button onClick={onFavoriteClick}>
          <Images.Heart
            fill={
              favorited
                ? 'var(--color-primary-400)'
                : 'var(--color-neutral-100)'
            }
          ></Images.Heart>
        </button>
        <div className={styles.endActionButtonContainer}>
          <button onClick={onActionClick} disabled={actionDisabled}>
            {icon}
          </button>
        </div>
      </div>
    </>
  )
}

export default ActionBar
