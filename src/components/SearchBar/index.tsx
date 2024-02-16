import React, { useEffect, useMemo, useRef } from 'react'

import { CloseButton, MagnifyingGlass } from '@/assets/images'

import styles from './SearchBar.module.scss'

type Props = {
  searchText: string
  setSearchText: (text: string) => void
  suggestions?: string[]
  i18n: {
    placeholder: string
  }
}

export default function SearchBar({
  searchText,
  setSearchText,
  i18n: { placeholder },
  suggestions
}: Props) {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.current) {
      const element = input.current
      element.value = searchText
      const handler = () => {
        setSearchText(element.value)
      }
      element.addEventListener('input', handler)
      return () => {
        element.removeEventListener('input', handler)
      }
    }
    return
  }, [input])

  const clearSearch = () => {
    if (input.current) {
      input.current.value = ''
      setSearchText('')
      input.current.focus()
    }
  }

  const showClearButton = searchText.length > 0
  const gameList = useMemo(() => {
    if (suggestions && searchText.length > 0) {
      return suggestions.filter((el) =>
        el.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    return []
  }, [suggestions, searchText])

  return (
    <div className={styles.searchBar}>
      <button className={styles.searchButton}>
        <MagnifyingGlass fill="var(--color-neutral-100)" />
      </button>
      <input ref={input} type="text" placeholder={placeholder} />
      {showClearButton && (
        <button className={styles.clearButton} onClick={() => clearSearch()}>
          <CloseButton
            fill="var(--color-neutral-100)"
            onClick={() => clearSearch()}
          />
      </button>
      )}
      {gameList.length > 0 && (
        <ul className={styles.autoComplete}>
          {gameList?.length > 0 &&
            gameList?.map((el) => <li key={el}>{el} </li>)}
        </ul>
      )}
    </div>
  )
}
