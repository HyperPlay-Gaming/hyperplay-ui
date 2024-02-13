import { useState } from 'react'

import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { TextInputProps } from '@/components/TextInput'

import styles from './FormDepositRewards.module.scss'
import { RewardERC20 } from './components/RewardERC20'
import { RewardERC721 } from './components/RewardERC721'
import { RewardERC1155 } from './components/RewardERC1155'
import { TokenIdItemProps } from './types'

const data = [
  { text: 'Select Reward Type' },
  { text: 'ERC721' },
  { text: 'ERC20' },
  { text: 'ERC1155' }
]

export interface FormDepositRewardI18nProp {
  tokenIdsTitle: string
  orAddManually: string
  callToActionAddToken: string
  addedTokenCounterText: string
  collapseAllIds: string
  pressEnterToAdd: string
  selectRewardTokenType: string
  placeholder: {
    tokenFrom: string
    tokenTo: string
    amountPerUser: string
    totalPlayerReach: string
    tokenIdGold: string
    tokenIdSilver: string
    totalPlayerReachGold: string
    totalPlayerReachSilver: string
  }
  label: {
    tokenFrom: string
    tokenTo: string
    amountPerUser: string
    totalPlayerReach: string
    tokenIdGold: string
    tokenIdSilver: string
    totalPlayerReachGold: string
    totalPlayerReachSilver: string
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
  onAddTokenTap: () => void
  i18n?: FormDepositRewardI18nProp
}

export function FormDepositRewards(props: FormDepositRewardsProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(data[0])

  let content = null
  if (selectedTokenType.text === 'ERC721') {
    content = <RewardERC721 {...props} />
  } else if (selectedTokenType.text === 'ERC20') {
    content = <RewardERC20 {...props} />
  } else if (selectedTokenType.text === 'ERC1155') {
    content = <RewardERC1155 {...props} />
  }

  return (
    <div className={styles.root}>
      <div>
        <div className={cn('caption', styles.label)}>
          {props.i18n?.selectRewardTokenType}
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
