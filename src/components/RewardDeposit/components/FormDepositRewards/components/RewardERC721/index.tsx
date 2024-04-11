'use client'

import React, { useState } from 'react'

import { ArrowTop, DownArrow } from '@/assets/images'
import Button from '@/components/Button'
import DepositMessage from '@/components/RewardDeposit/components/DepositMessage'
import TextInput, { TextInputProps } from '@/components/TextInput'
import { NumberInput, NumberInputProps } from '@/index'

import { TokenIdItemProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'
import styles from './index.module.scss'

export interface RewardERC721I18nProp {
  tokenIdsTitle: string
  orAddManually: string
  callToActionAddToken: string
  addedTokenCounterText: string
  collapseAllIds: string
  pressEnterToAdd: string
  placeholder: {
    tokenFrom: string
    tokenTo: string
    tokenId: string
  }
  label: {
    tokenFrom: string
    tokenTo: string
    tokenId: string
  }
}

export interface RewardERC721Props {
  tokenFromNumberInputProps?: NumberInputProps
  tokenToNumberInputProps?: NumberInputProps
  manualTokenIdProps?: NumberInputProps
  tokenIdsList?: TokenIdItemProps[]
  message?: string
  isAddTokenButtonDisabled?: boolean
  defaultTokenIdsListVisibilityState?: boolean
  onAddTokenTap?: () => void
  onManualTokenAdd?: () => void
  i18n?: RewardERC721I18nProp
}

export const defaultI18n: RewardERC721I18nProp = {
  tokenIdsTitle: 'Token IDs',
  orAddManually: 'Or add manually',
  callToActionAddToken: 'Add Token IDs',
  addedTokenCounterText: 'IDs added:',
  collapseAllIds: 'Collapse all IDs',
  pressEnterToAdd: 'Press enter to add',
  placeholder: {
    tokenFrom: '0',
    tokenTo: '99',
    tokenId: 'Paste token ID'
  },
  label: {
    tokenFrom: 'From',
    tokenTo: 'To',
    tokenId: 'Token ID'
  }
}

export function RewardERC721({
  tokenFromNumberInputProps,
  tokenToNumberInputProps,
  manualTokenIdProps,
  onAddTokenTap,
  message,
  tokenIdsList = [],
  isAddTokenButtonDisabled = false,
  defaultTokenIdsListVisibilityState = false,
  onManualTokenAdd,
  i18n = defaultI18n
}: RewardERC721Props) {
  const label = (
    <span>
      {i18n.label.tokenId}{' '}
      <span className={styles.labelHint}>({i18n.pressEnterToAdd})</span>
    </span>
  )
  const [showTokenIds, setShowTokenIds] = useState<boolean>(
    defaultTokenIdsListVisibilityState
  )
  const onShowToken = () => {
    setShowTokenIds((prev) => !prev)
  }

  return (
    <div className={styles.base}>
      <h6 className={styles.title}>{i18n.tokenIdsTitle}</h6>
      <div className={styles.tokenContainer}>
        <NumberInput
          {...tokenFromNumberInputProps}
          classNames={{
            label: styles.label
          }}
          size="medium"
          label={i18n.label.tokenFrom}
          placeholder={i18n.placeholder.tokenFrom}
        />
        <NumberInput
          {...tokenToNumberInputProps}
          classNames={{
            label: styles.label
          }}
          size="medium"
          label={i18n.label.tokenTo}
          placeholder={i18n.placeholder.tokenTo}
        />
        <div className={styles.addTokenIdButtonContainer}>
          <Button
            type="secondaryGradient"
            size="medium"
            onClick={onAddTokenTap}
            disabled={isAddTokenButtonDisabled}
          >
            <div>{i18n.callToActionAddToken}</div>
          </Button>
        </div>
      </div>
      <div className={styles.addManuallyStatement}>
        <span className={styles.line}></span>
        <span className={styles.addManuallyStatementText}>
          {i18n.orAddManually}
        </span>
        <span className={styles.line}></span>
      </div>
      <NumberInput
        {...manualTokenIdProps}
        label={label}
        size="medium"
        placeholder={i18n.placeholder.tokenId}
        classNames={{
          label: styles.label
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onManualTokenAdd?.()
          }
        }}
      />
      {message && <DepositMessage message={message} />}
      {tokenIdsList.length > 0 && (
        <div className={styles.tokensAddedContainer}>
          <div className={styles.tokensAddedActionsContainer}>
            <span>
              {i18n.addedTokenCounterText} {tokenIdsList.length}
            </span>
            <div className={styles.tokensAddedActions}>
              <span>{i18n.collapseAllIds}</span>
              {showTokenIds ? (
                <DownArrow
                  onClick={onShowToken}
                  className={styles.arrowDownIcon}
                />
              ) : (
                <ArrowTop
                  onClick={onShowToken}
                  className={styles.arrowTopIcon}
                />
              )}
            </div>
          </div>
          {showTokenIds && (
            <div className={styles.tokensAddedList}>
              {tokenIdsList.map((tokenProps, index) => (
                <TokenIdRow
                  key={`token-${tokenProps.tokenId}-${index}`}
                  {...tokenProps}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
