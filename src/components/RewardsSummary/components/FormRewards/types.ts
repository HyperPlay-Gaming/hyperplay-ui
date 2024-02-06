import { TextInputProps } from '@/components/TextInput'

export interface TokenRewardInput {
  tokenNameTextInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
}

export interface TokenIdRowInputProps extends TokenRewardInput {
  onRemoveClick: () => void
}
