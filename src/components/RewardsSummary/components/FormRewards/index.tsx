import { useState } from 'react'

import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { SelectCreatable } from '@/components/SelectCreatable'
import TextInput from '@/components/TextInput'

import styles from './FormRewards.module.scss'
import { RewardERC20_721 } from './components/RewardERC20_721'
import { RewardERC1155 } from './components/RewardERC1155'
import { TokenIdRowInputProps } from './types'

export const DEFAULT_FORM_REWARDS_i18n: FormRewardsI18n = {
  addTokenId: 'Add Token',
  placeholder: {
    rewardType: 'Reward Type',
    network: 'Network',
    contractAddress: 'Contract Address',
    tokenName: 'Ex: GOLD',
    marketplaceUrl: 'https://',
    decimals: 'Decimals',
    amountPerUser: 'Amount Per User',
    tokenId: 'Enter token ID'
  },
  label: {
    rewardType: 'Reward Type',
    network: 'Network',
    contractAddress: 'Contract Address',
    tokenName: 'Token Name',
    marketplaceUrl: 'Marketplace URL',
    decimals: 'Decimals',
    amountPerUser: 'Amount Per Player',
    tokenId: 'Token ID'
  }
}

export interface FormRewardsI18n {
  addTokenId: string
  placeholder: {
    rewardType: string
    network: string
    contractAddress: string
    tokenName: string
    marketplaceUrl: string
    decimals: string
    amountPerUser: string
    tokenId: string
  }
  label: {
    rewardType: string
    network: string
    contractAddress: string
    tokenName: string
    marketplaceUrl: string
    decimals: string
    amountPerUser: string
    tokenId: string
  }
}

export interface FormRewardsProps {
  rewardTypeInputProps: GetInputPropsReturnType
  networkInputProps: GetInputPropsReturnType
  contractAddressInputProps: GetInputPropsReturnType
  tokenNameInputProps: GetInputPropsReturnType
  amountPerUserInputProps: GetInputPropsReturnType
  marketplaceUrlInputProps: GetInputPropsReturnType
  decimalsInputProps: GetInputPropsReturnType

  // Dropdown options
  networkOptions: string[]
  /* eslint-disable-next-line */
  tokenTypeOptions: any[]

  /* erc1155 props*/
  tokenIdsInputProps: TokenIdRowInputProps[]
  addTokenId: () => void

  i18n: FormRewardsI18n
}

export function FormRewards(props: FormRewardsProps) {
  /* eslint-disable-next-line */
  const [selectedTokenType, setSelectedTokenType] = useState<any | undefined>(
    props.rewardTypeInputProps.value
  )

  let content = null
  if (selectedTokenType) {
    if (selectedTokenType.text === 'ERC721') {
      content = <RewardERC20_721 tokenType="ERC-721" {...props} />
    } else if (selectedTokenType.text === 'ERC-20') {
      content = <RewardERC20_721 tokenType="ERC-20" {...props} />
    } else if (selectedTokenType.text === 'ERC-1155') {
      content = <RewardERC1155 {...props} />
    }
  }

  return (
    <div className={styles.root}>
      <div>
        <div className={cn('caption', styles.label)}>
          {props.i18n.label.network}
        </div>
        <SelectCreatable
          {...props.networkInputProps}
          options={props.networkOptions}
          onCreated={(option) => props.networkInputProps.onChange(option)}
        />
      </div>
      <TextInput
        label={props.i18n.label.contractAddress}
        placeholder={props.i18n.placeholder.contractAddress}
        {...props.contractAddressInputProps}
      />
      <div>
        <div className={cn('caption', styles.label)}>
          {props.i18n.label.rewardType}
        </div>
        <Dropdown
          options={props.tokenTypeOptions}
          selected={
            selectedTokenType
              ? selectedTokenType
              : { text: props.i18n.placeholder.rewardType }
          }
          onItemChange={(item) => {
            setSelectedTokenType(item)
            props.rewardTypeInputProps.onChange(item)
          }}
          targetWidth={300}
          dropdownButtonDivProps={{ className: styles.dropdownButton }}
          classNames={{ item: styles.dropdownItem }}
        />
      </div>
      {content}
    </div>
  )
}
