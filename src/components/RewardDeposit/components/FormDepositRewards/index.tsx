import { useState } from 'react'

import cn from 'classnames'

import { TokenType } from '@/common/types'
import { Dropdown } from '@/components/Dropdowns'
import { TextInputProps } from '@/components/TextInput'

import styles from './FormDepositRewards.module.scss'
import {
  RewardERC20,
  RewardERC20I18nProp,
  defaultI18n as defaultRewardERC20I18n
} from './components/RewardERC20'
import {
  RewardERC721,
  RewardERC721I18nProp,
  defaultI18n as defaultRewardERC721I18n
} from './components/RewardERC721'
import {
  RewardERC1155,
  RewardERC1155I18nProp,
  defaultI18n as defaultRewardERC1155I18n
} from './components/RewardERC1155'
import { TokenIdItemProps } from './types'

const data = [
  { text: 'Select Reward Type' },
  { text: 'ERC721', id: 'erc721' },
  { text: 'ERC20', id: 'erc20' },
  { text: 'ERC1155', id: 'erc1155' }
]

export interface FormDepositRewardI18nProp
  extends RewardERC1155I18nProp,
    RewardERC721I18nProp,
    RewardERC20I18nProp {
  tokenIdsTitle: string
  selectRewardTokenType: string
  tokenType: Record<TokenType, string>
  placeholder: RewardERC1155I18nProp['placeholder'] &
    RewardERC721I18nProp['placeholder'] &
    RewardERC20I18nProp['placeholder']
  label: RewardERC1155I18nProp['label'] &
    RewardERC721I18nProp['label'] &
    RewardERC20I18nProp['label']
}

export const defaultI18n: FormDepositRewardI18nProp = {
  selectRewardTokenType: 'Select Reward Type',
  ...defaultRewardERC1155I18n,
  ...defaultRewardERC721I18n,
  ...defaultRewardERC20I18n,
  tokenType: {
    erc20: 'ERC-20',
    erc721: 'ERC-721',
    erc1155: 'ERC-1155'
  },
  placeholder: {
    ...defaultRewardERC1155I18n.placeholder,
    ...defaultRewardERC721I18n.placeholder,
    ...defaultRewardERC20I18n.placeholder
  },
  label: {
    ...defaultRewardERC1155I18n.label,
    ...defaultRewardERC721I18n.label,
    ...defaultRewardERC20I18n.label
  }
}

export interface FormDepositRewardsProps {
  tokenFromNumberInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
  totalPlayerReachNumberInputProps: TextInputProps
  tokenIdGoldNumberInputProps: TextInputProps
  tokenIdSilverNumberInputProps: TextInputProps
  totalPlayerReachGoldNumberInputProps: TextInputProps
  totalPlayerReachSilverNumberInputProps: TextInputProps
  tokenToNumberInputProps: TextInputProps
  tokenIdsList: TokenIdItemProps[]
  isAddTokenButtonDisabled?: boolean
  defaultTokenIdsListVisibilityState?: boolean
  onAddTokenTap: () => void
  defaultSelected?: TokenType
  i18n?: FormDepositRewardI18nProp
}

export function FormDepositRewards({
  i18n = defaultI18n,
  ...props
}: FormDepositRewardsProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(
    props.defaultSelected ? { text: i18n.tokenType[props.defaultSelected], id: props.defaultSelected } : data[0]
  )

  let content = null
  if (selectedTokenType.id === 'erc721') {
    content = <RewardERC721 {...props} i18n={i18n} />
  } else if (selectedTokenType.id === 'erc20') {
    content = <RewardERC20 {...props} i18n={i18n} />
  } else if (selectedTokenType.id === 'erc1155') {
    content = <RewardERC1155 {...props} i18n={i18n} />
  }

  return (
    <div className={styles.root}>
      <div>
        <div className={cn('caption', styles.label)}>
          {i18n?.selectRewardTokenType}
        </div>
        <Dropdown
          options={data}
          selected={selectedTokenType}
          onItemChange={(item) => {
            setSelectedTokenType(item)
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
