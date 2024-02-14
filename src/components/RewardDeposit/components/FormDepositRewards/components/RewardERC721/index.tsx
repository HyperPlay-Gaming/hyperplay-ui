'use client'

import React, { useState } from 'react'

import { ArrowTop, DownArrow } from '@/assets/images'
import Button from '@/components/Button'
import TextInput, { TextInputProps } from '@/components/TextInput'

import { TokenIdItemProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'
import styles from './index.module.scss'

export interface RewardERC721Props {
  tokenFromNumberInputProps: TextInputProps
  tokenToNumberInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
  tokenIdsList: TokenIdItemProps[]
  isAddTokenButtonDisabled?: boolean
  onAddTokenTap: () => void
  i18n?: {
    tokenIdsTitle: string
    orAddManually: string
    callToActionAddToken: string
    addedTokenCounterText: string
    collapseAllIds: string
    pressEnterToAdd: string
    placeholder: {
      tokenFrom: string
      tokenTo: string
      amountPerUser: string
    }
    label: {
      tokenFrom: string
      tokenTo: string
      amountPerUser: string
    }
  }
}

export function RewardERC721({
  tokenFromNumberInputProps,
  tokenToNumberInputProps,
  amountPerUserTextInputProps,
  onAddTokenTap,
  tokenIdsList = [],
  isAddTokenButtonDisabled = false,
  i18n = {
    tokenIdsTitle: 'Token IDs',
    orAddManually: 'Or add manually',
    callToActionAddToken: 'Add Token IDs',
    addedTokenCounterText: 'IDs added:',
    collapseAllIds: 'Collapse all IDs',
    pressEnterToAdd: 'Press enter to add',
    placeholder: {
      tokenFrom: '0',
      tokenTo: '99',
      amountPerUser: 'Paste token ID'
    },
    label: {
      tokenFrom: 'From',
      tokenTo: 'To',
      amountPerUser: 'Token ID'
    }
  }
}: RewardERC721Props) {
  const label = (
    <span>
      {i18n.label.amountPerUser}{' '}
      <span className={styles.labelHint}>({i18n.pressEnterToAdd})</span>
    </span>
  )
  const [showTokenIds, setShowTokenIds] = useState<boolean>(false)
  const onShowToken = () => {
    setShowTokenIds((prev) => !prev)
  }

  return (
    <div className={styles.base}>
      <h6 className={styles.title}>{i18n.tokenIdsTitle}</h6>
      <div className={styles.tokenContainer}>
        <TextInput
          {...tokenFromNumberInputProps}
          classNames={{
            label: styles.label
          }}
          size="small"
          label={i18n.label.tokenFrom}
          placeholder={i18n.placeholder.tokenFrom}
        />
        <TextInput
          {...tokenToNumberInputProps}
          classNames={{
            label: styles.label
          }}
          size="small"
          label={i18n.label.tokenTo}
          placeholder={i18n.placeholder.tokenTo}
        />
        <div className={styles.addTokenIdButtonContainer}>
          <Button
            type="secondary-gradient-button"
            size="large"
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
      <TextInput
        {...amountPerUserTextInputProps}
        label={label}
        size="small"
        placeholder={i18n.placeholder.amountPerUser}
        classNames={{
          label: styles.label
        }}
      />
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