'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './index.module.scss'

export interface RewardERC1155Props {
  tokenIdGoldNumberInputProps: TextInputProps
  tokenIdSilverNumberInputProps: TextInputProps
  totalPlayerReachGoldNumberInputProps: TextInputProps
  totalPlayerReachSilverNumberInputProps: TextInputProps
  i18n?: {
    tokenIdsTitle: string
    placeholder: {
      tokenIdGold: string
      tokenIdSilver: string
      totalPlayerReachGold: string
      totalPlayerReachSilver: string
    }
    label: {
      tokenIdGold: string
      tokenIdSilver: string
      totalPlayerReachGold: string
      totalPlayerReachSilver: string
    }
  }
}

export function RewardERC1155({
  tokenIdGoldNumberInputProps,
  tokenIdSilverNumberInputProps,
  totalPlayerReachGoldNumberInputProps,
  totalPlayerReachSilverNumberInputProps,
  i18n = {
    tokenIdsTitle: 'Token IDs',
    placeholder: {
      tokenIdGold: 'Paste token ID',
      tokenIdSilver: 'Paste token ID',
      totalPlayerReachGold: '0',
      totalPlayerReachSilver: '0'
    },
    label: {
      tokenIdGold: 'Token ID: GOLD',
      tokenIdSilver: 'Token ID: SILVER',
      totalPlayerReachGold: 'Total Player Reach: GOLD',
      totalPlayerReachSilver: 'Total Player Reach: SILVER'
    }
  }
}: RewardERC1155Props) {
  return (
    <div>
      <div className={styles.tokenIdContainer}>
        <h6 className={styles.title}>{i18n.tokenIdsTitle}</h6>
        <TextInput
          {...tokenIdGoldNumberInputProps}
          size="small"
          label={i18n.label.tokenIdGold}
          placeholder={i18n.placeholder.tokenIdGold}
        />
        <TextInput
          {...tokenIdSilverNumberInputProps}
          size="small"
          label={i18n.label.tokenIdGold}
          placeholder={i18n.placeholder.tokenIdSilver}
        />
      </div>
      <TextInput
        {...totalPlayerReachGoldNumberInputProps}
        size="small"
        label={i18n.label.totalPlayerReachGold}
        placeholder={i18n.placeholder.totalPlayerReachGold}
      />
      <TextInput
        {...totalPlayerReachSilverNumberInputProps}
        size="small"
        label={i18n.label.totalPlayerReachSilver}
        placeholder={i18n.placeholder.totalPlayerReachSilver}
      />
    </div>
  )
}
