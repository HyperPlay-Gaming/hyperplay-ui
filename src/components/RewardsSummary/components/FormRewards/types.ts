import { TextInputProps } from '@/components/TextInput'

export interface TokenRewardInput {
  tokenNameTextInputProps: TextInputProps
  amountPerUserTextInputProps: TextInputProps
}

export interface TokenIdRowInputProps extends TokenRewardInput {
  onRemoveClick: () => void
}

export interface i18nProps {
  i18n?: {
    tokenNameLabel?: string
    tokenNamePlaceholder?: string
    amountPerPlayerLabel?: string
    decimalsLabel?: string
    marketplaceLabel?: string
    marketplacePlaceholder?: string
    addTokenId?: string
  }
}
