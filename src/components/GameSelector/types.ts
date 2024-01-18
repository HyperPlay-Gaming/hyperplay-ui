import { HTMLProps } from 'react'

export interface GameDetails {
  title: string
  img: string
  onClick: () => void
}

export interface GameSelectorProps extends HTMLProps<HTMLDivElement> {
  selectedGames: GameDetails[]
  searchResultGames: GameDetails[]
  onSearchInput: (text: string) => void
  i18n?: {
    selectGame: string
    selectUpTo: string
    searchForGames: string
  }
}
