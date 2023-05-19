import React from 'react'

import * as Images from '../../../../assets/images'
import styles from '../../GameCard.module.scss'

type ActionBarProps = {
  title: string
  onSettingsClick: () => void
  onFavoriteClick: () => void
  onActionClick: () => void
  icon: JSX.Element
  favorited?: boolean
  showSettings: boolean
}

const ActionBar = ({
  title,
  onSettingsClick,
  onFavoriteClick,
  onActionClick,
  icon,
  favorited,
  showSettings
}: ActionBarProps) => {
  return (
    <>
      <div className={`${styles.title} title`}>{title}</div>
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
          <button onClick={onActionClick}>{icon}</button>
        </div>
      </div>
    </>
  )
}

export default ActionBar
