import { TextInputProps } from '@/components/TextInput'

export interface TokenRewardInput {
  tokenNameInputProps?: TextInputProps
  amountPerUserInputProps?: TextInputProps
}

export interface TokenIdRowInputProps extends TokenRewardInput {
  onRemoveClick: () => void
}
