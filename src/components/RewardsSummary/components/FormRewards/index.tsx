import { useState } from 'react'

import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { itemType } from '@/components/Dropdowns/Dropdown'
import {
  SelectCreatable,
  SelectCreatableProps
} from '@/components/SelectCreatable'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './ .module.scss'
import { RewardERC20_721 } from './components/RewardERC20_721'
import { RewardERC1155 } from './components/RewardERC1155'

const data = [
  { text: 'Select Reward Type' },
  { text: 'ERC721' },
  { text: 'ERC20' },
  { text: 'ERC1155' }
]

export interface FormRewardsProps {
  tokenAddressTextInputProps: TextInputProps
  onDropdownSelectionChange: (item: itemType) => void
  networkSelectCreatableProps: SelectCreatableProps
  i18n: {
    addTokenId: string
  }
}

export function FormRewards({
  tokenAddressTextInputProps,
  onDropdownSelectionChange,
  networkSelectCreatableProps
}: FormRewardsProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(data[0])
  let content = null
  if (selectedTokenType.text === 'ERC721') {
    content = <RewardERC20_721 tokenType="erc721" />
  } else if (selectedTokenType.text === 'ERC20') {
    content = <RewardERC20_721 tokenType="erc20" />
  } else {
    content = <RewardERC1155 />
  }
  return (
    <div className={styles.root}>
      <SelectCreatable {...networkSelectCreatableProps} />
      <TextInput {...tokenAddressTextInputProps} />
      <div>
        <div className={cn('caption', styles.label)}>Reward Token Type</div>
        <Dropdown
          options={data}
          selected={selectedTokenType}
          onItemChange={(item) => {
            setSelectedTokenType(item)
            onDropdownSelectionChange(item)
          }}
        />
      </div>
      {content}
    </div>
  )
}
