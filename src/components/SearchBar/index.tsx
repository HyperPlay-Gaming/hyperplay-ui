import React, { useEffect, useMemo, useRef } from 'react'

import { Popover } from '@mantine/core'
import classNames from 'classnames'

import { CloseButton, MagnifyingGlass } from '@/assets/images'

import styles from './SearchBar.module.scss'

type Props = {
  searchText: string
  setSearchText: (text: string) => void
  onClickSuggestion?: (suggestion: string) => void
  suggestions?: string[]
  i18n: {
    placeholder: string
  }
  containerClass?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function SearchBar({
  searchText,
  setSearchText,
  i18n: { placeholder },
  suggestions,
  onClickSuggestion,
  containerClass,
  inputProps
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

  const handleOnClickSuggestion = (suggestion: string) => {
    if (onClickSuggestion) {
      onClickSuggestion(suggestion)
      if (input.current) input.current.value = ''
      setSearchText('')
      return
    }
    if (input.current) input.current.value = suggestion
    setSearchText(suggestion)
  }

  let searchResults = <div>No results</div>
  if (gameList.length > 0) {
    searchResults = (
      <>
        {gameList.map((el) => (
          <button
            onClick={() => handleOnClickSuggestion(el)}
            key={el}
            className={styles.searchResult}
          >
            {el}
          </button>
        ))}
      </>
    )
  }

  return (
    <Popover
      width={240}
      classNames={{ dropdown: styles.popoverDropdown }}
      unstyled
    >
      <Popover.Target>
        <div className={classNames(styles.searchBar, containerClass)}>
          <button className={styles.searchButton}>
            <MagnifyingGlass fill="var(--color-neutral-400)" />
          </button>
          <input
            ref={input}
            type="text"
            placeholder={placeholder}
            {...inputProps}
            className={classNames('body-sm', inputProps?.className)}
          />
          {showClearButton && (
            <button className={styles.clearButton} onClick={clearSearch}>
              <CloseButton
                fill="var(--color-neutral-400)"
                onClick={clearSearch}
              />
            </button>
          )}
        </div>
      </Popover.Target>
      <Popover.Dropdown>{searchResults}</Popover.Dropdown>
    </Popover>
  )
}
