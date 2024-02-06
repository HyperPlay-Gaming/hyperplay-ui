import { useState } from 'react'

import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { itemType } from '@/components/Dropdowns/Dropdown'
import {
  SelectCreatable,
  SelectCreatableProps
} from '@/components/SelectCreatable'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './FormRewards.module.scss'
import { RewardERC20_721 } from './components/RewardERC20_721'
import { RewardERC1155 } from './components/RewardERC1155'
import { TokenIdRowInputProps } from './types'

const data = [
  { text: 'Select Reward Type' },
  { text: 'ERC721' },
  { text: 'ERC20' },
  { text: 'ERC1155' }
]

export interface FormRewardsProps {
  /* Form Rewards top level props */
  tokenAddressTextInputProps: TextInputProps
  onDropdownSelectionChange: (item: itemType) => void
  networkSelectCreatableProps: SelectCreatableProps

  /* erc20 and erc721 props*/
  tokenNameTextInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
  decimalsTextInputProps: TextInputProps

  /* erc1155 props*/
  rewardInputs: TokenIdRowInputProps[]
  addTokenId: () => void
  i18n: {
    addTokenId: string
  }

  /* all erc child component props */
  marketplaceUrlTextInputProps: TextInputProps
}

export function FormRewards(props: FormRewardsProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(data[0])

  let content = null
  if (selectedTokenType.text === 'ERC721') {
    content = <RewardERC20_721 tokenType="erc721" {...props} />
  } else if (selectedTokenType.text === 'ERC20') {
    content = <RewardERC20_721 tokenType="erc20" {...props} />
  } else if (selectedTokenType.text === 'ERC1155') {
    content = <RewardERC1155 {...props} />
  }

  return (
    <div className={styles.root}>
      <SelectCreatable {...props.networkSelectCreatableProps} />
      <TextInput {...props.tokenAddressTextInputProps} />
      <div>
        <div className={cn('caption', styles.label)}>Reward Token Type</div>
        <Dropdown
          options={data}
          selected={selectedTokenType}
          onItemChange={(item) => {
            setSelectedTokenType(item)
            props.onDropdownSelectionChange(item)
          }}
          targetWidth={300}
        />
      </div>
      {content}
    </div>
  )
}
