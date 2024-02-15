'use client'

import React from 'react'

import { IconPlus } from '@tabler/icons-react'

import Button from '@/components/Button'
import TextInput, { TextInputProps } from '@/components/TextInput'

import { FormRewardsI18n } from '../..'
import { TokenIdRowInputProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'
import styles from './index.module.scss'

export interface RewardERC1155Props {
  marketplaceUrlInputProps: TextInputProps
  tokenIdsInputProps: TokenIdRowInputProps[]
  addTokenId: () => void
  i18n: FormRewardsI18n
}

export function RewardERC1155({
  marketplaceUrlInputProps,
  tokenIdsInputProps,
  addTokenId,
  i18n
}: RewardERC1155Props) {
  const tokenIdRows = tokenIdsInputProps.map((inputs_i, index) => (
    <TokenIdRow
      key={index}
      i18n={i18n}
      {...inputs_i}
      onRemoveClick={inputs_i.onRemoveClick}
    />
  ))
  return (
    <>
      <div>
        <div className={styles.tokenIdContainer}>
          {tokenIdRows}
          <Button
            onClick={addTokenId}
            type="link"
            leftIcon={<IconPlus />}
            className={styles.addTokenIdButton}
            htmlType="button"
          >
            {i18n.addTokenId}
          </Button>
        </div>
        <TextInput
          className={styles.marketplaceUrlInput}
          label={i18n.label.marketplaceUrl}
          placeholder={i18n.placeholder.marketplaceUrl}
          {...marketplaceUrlInputProps}
        />
      </div>
    </>
  )
}
