import { useState } from 'react'

import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { TextInputProps } from '@/components/TextInput'

import styles from './FormRewards.module.scss'
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

export interface FormRewardsProps {
  tokenFromNumberInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
  totalPlayerReachNumberInputProps: TextInputProps
  tokenIdsNumberInputs: TextInputProps[]
  totalPlayerReachNumberInputs: TextInputProps[]
  tokenToNumberInputProps: TextInputProps
  tokenIdsList: TokenIdItemProps[]
  isAddTokenButtonDisabled?: boolean
  onAddTokenTap: () => void
  i18n?: {
    tokenIdsTitle: string
    orAddManually: string
    callToActionAddToken: string
    addedTokenCounterText: string
    collapseAllIds: string
  }
}

export function FormRewards(props: FormRewardsProps) {
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
        <div className={cn('caption', styles.label)}>Reward Token Type</div>
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
