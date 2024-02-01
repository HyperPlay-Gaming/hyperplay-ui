import { useState } from 'react'

import { Dropdown } from '@/components/Dropdowns'
import { itemType } from '@/components/Dropdowns/Dropdown'
import TextInput from '@/components/TextInput'

const data = [{ text: 'ERC721' }, { text: 'ERC20' }, { text: 'ERC1155' }]

export interface RewardsFormProps {
  onTokenAddressChange: (text: string) => void
  onDropdownSelectionChange: (item: itemType) => void
}

export default function RewardsForm({
  onTokenAddressChange,
  onDropdownSelectionChange
}: RewardsFormProps) {
  const [selectedTokenType, setSelectedTokenType] = useState(data[0])
  return (
    <div>
      {
        //TODO: add network selection/search component
      }
      <TextInput
        placeholder="Paste token address"
        label="Token Contract Address"
        onChange={(ev) => onTokenAddressChange(ev.target.value)}
      />
      <Dropdown
        options={data}
        selected={selectedTokenType}
        onItemChange={(item) => {
          setSelectedTokenType(item)
          onDropdownSelectionChange(item)
        }}
      />
    </div>
  )
}
