import { useState } from 'react'

import cn from 'classnames'

import { Dropdown } from '@/components/Dropdowns'
import { itemType } from '@/components/Dropdowns/Dropdown'
import {
  SelectCreatable,
  SelectCreatableProps
} from '@/components/SelectCreatable'
import TextInput from '@/components/TextInput'

import styles from './FormRewards.module.scss'

const data = [
  { text: 'Select Reward Type' },
  { text: 'ERC721' },
  { text: 'ERC20' },
  { text: 'ERC1155' }
]

export interface FormRewardsProps {
  onTokenAddressChange: (text: string) => void
  onDropdownSelectionChange: (item: itemType) => void
  networkSelectCreatableProps: SelectCreatableProps
}

export function FormRewards({
  onTokenAddressChange,
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
        onChange={(ev) => onTokenAddressChange(ev.target.value)}
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
