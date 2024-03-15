import { HTMLProps } from 'react'

import { MenuProps } from '@mantine/core'

import { TextInputProps } from '@/components/TextInput'

export interface GameDetails {
  gameId: string
  title: string
  img: string
  onClick: () => void
}

export interface GameSelectorProps extends HTMLProps<HTMLDivElement> {
  selectedGames: GameDetails[]
  searchResultGames: GameDetails[]
  onSearchInput: (text: string) => void
  inputProps?: TextInputProps
  menuProps?: MenuProps
  i18n?: {
    selectGame: string
    selectUpTo: string
    searchForGames: string
  }
}
