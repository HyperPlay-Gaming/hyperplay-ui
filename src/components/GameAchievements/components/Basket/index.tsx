import React from 'react'

import * as Images from '@/assets/images'

import styles from './Basket.module.scss'

export interface BasketProps {
  amount: number
}

export default function Basket({ amount }: BasketProps) {
  return (
    <div className={styles.basket}>
      <Images.TrophyOutline width="22" height="22" />
      <div className={styles.badge}>{amount}</div>
    </div>
  )
}
