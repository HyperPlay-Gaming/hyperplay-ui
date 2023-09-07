import React from 'react'

import { EpicStoreIcon, HyperPlayLogoIcon, SteamIcon } from '@/assets/images'

import styles from './StoreRow.module.scss'

interface StoreRowProps {
  /**
   * The store to display
   */
  store: 'steam' | 'epic' | 'hyperplay'
  /**
   * The label for that goes beneath the store name.
   * We wan this to be passed as a prop, because we want to be able to pass in a number of games
   * and a translatable string.
   */
  secondaryText?: string
  children?: React.ReactNode
}

export default function StoreRow({
  store,
  secondaryText,
  children
}: StoreRowProps) {
  const getStoreData = () => {
    switch (store) {
      case 'steam':
        return {
          icon: <SteamIcon height={40} />,
          name: 'Steam'
        }
      case 'epic':
        return {
          icon: <EpicStoreIcon height={40} />,
          name: 'Epic Games Store'
        }
      case 'hyperplay':
        return {
          icon: <HyperPlayLogoIcon height={40} />,
          name: 'Hyperplay'
        }
    }
  }

  const storeData = getStoreData()

  if (!storeData) return null

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div>{storeData.icon}</div>
        <div className={styles.col}>
          <div className="body-sm">{storeData.name}</div>
          {secondaryText && (
            <div className="caption color-neutral-400">{secondaryText}</div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
