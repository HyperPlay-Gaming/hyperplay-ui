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
}

export function FormRewards({
  tokenAddressTextInputProps,
  onDropdownSelectionChange,
  networkSelectCreatableProps
}: FormRewardsProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(data[0])
  return (
    <div className={styles.root}>
      <SelectCreatable {...networkSelectCreatableProps} />
      <TextInput
        placeholder="Paste token address"
        label="Token Contract Address"
        {...tokenAddressTextInputProps}
      />
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
    </div>
  )
}
