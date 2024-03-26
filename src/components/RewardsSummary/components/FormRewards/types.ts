import { NumberInputProps } from '@/components/NumberInput'
import { TextInputProps } from '@/components/TextInput'

export interface TokenRewardInput {
  tokenNameInputProps?: TextInputProps
  amountPerUserInputProps?: NumberInputProps
}

export interface TokenIdRowInputProps extends TokenRewardInput {
  onRemoveClick: () => void
}
