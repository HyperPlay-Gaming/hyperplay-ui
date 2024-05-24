'use client'

import cn from 'classnames'

import { TrashCan } from '@/assets/images'
import Button from '@/components/Button'
import { NumberInput, NumberInputProps } from '@/index'

import RewardDepositMessage from '../RewardDepositMessage'
import RewardDepositTokenList from '../RewardDepositTokensList'
import styles from './index.module.scss'

export interface RewardERC721DepositI18nProp {
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
  clear: string
}

interface TokenIdItemProps {
  tokenId: number
  error?: string
  onRemoveTap: () => void
}

export interface RewardERC721DepositProps {
  tokenFromNumberInputProps?: NumberInputProps
  tokenToNumberInputProps?: NumberInputProps
  manualTokenIdProps?: NumberInputProps
  tokenIdsList?: TokenIdItemProps[]
  message?: string
  isAddTokenButtonDisabled?: boolean
  defaultTokenIdsListVisibilityState?: boolean
  onAddTokenTap?: () => void
  onManualTokenAdd?: () => void
  onClearTokenIds?: () => void
  i18n?: RewardERC721DepositI18nProp
}

export const defaultI18n: RewardERC721DepositI18nProp = {
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
  },
  clear: 'Clear'
}

export function RewardERC721Deposit({
  tokenFromNumberInputProps,
  tokenToNumberInputProps,
  manualTokenIdProps,
  onAddTokenTap,
  message,
  tokenIdsList = [],
  isAddTokenButtonDisabled = false,
  defaultTokenIdsListVisibilityState = false,
  onManualTokenAdd,
  onClearTokenIds,
  i18n = defaultI18n
}: RewardERC721DepositProps) {
  const label = (
    <span className={styles.labelContainer}>
      <span>
        {i18n.label.tokenId}{' '}
        <span className={styles.labelHint}>({i18n.pressEnterToAdd})</span>
      </span>
      {tokenIdsList.length > 0 && (
        <Button
          size="small"
          type="link"
          htmlType="button"
          className={styles.clearButton}
          onClick={onClearTokenIds}
        >
          {i18n.clear}
        </Button>
      )}
    </span>
  )

  return (
    <div className={styles.base}>
      <h6 className={styles.title}>{i18n.tokenIdsTitle}</h6>
      {tokenIdsList?.length === 0 && (
        <>
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
                htmlType="button"
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
        </>
      )}
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
      {message && <RewardDepositMessage message={message} />}
      {tokenIdsList.length > 0 && (
        <RewardDepositTokenList
          tokenCount={tokenIdsList.length}
          visibleByDefault={defaultTokenIdsListVisibilityState}
        >
          {tokenIdsList.map(({ tokenId, error, onRemoveTap }, index) => (
            <RewardDepositTokenList.Row key={`token-${tokenId}-${index}`}>
              <div className={cn(error && styles.error)}>
                {error ? `${tokenId} (${error})` : tokenId}
              </div>
              <Button
                htmlType="button"
                aria-label={`Remove token ID ${tokenId}`}
                type="tertiary"
                onClick={onRemoveTap}
                rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
                className={styles.removeButton}
              />
            </RewardDepositTokenList.Row>
          ))}
        </RewardDepositTokenList>
      )}
    </div>
  )
}

export default RewardERC721Deposit
