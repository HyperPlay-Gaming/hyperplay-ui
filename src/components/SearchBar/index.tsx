import React, { CSSProperties, useEffect, useRef } from 'react'

import { Popover, PopoverProps } from '@mantine/core'
import cn from 'classnames'

import { CloseButton, MagnifyingGlass } from '@/assets/images'

import searchBarStyles from './SearchBar.module.scss'

interface Props extends PopoverProps {
  searchText: string
  setSearchText: (text: string) => void
  onClickSuggestion?: (suggestion: string) => void
  suggestions?: string[]
  i18n: {
    placeholder: string
  }
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  classNames?: {
    dropdown?: string
    arrow?: string
    container?: string
    dropdownList?: string
  }
  styles?: {
    dropdown?: CSSProperties
    arrow?: CSSProperties
    container?: CSSProperties
    dropdownList?: CSSProperties
  }
  renderItem?: (suggestion: string) => React.ReactNode
}

export default function SearchBar({
  searchText,
  setSearchText,
  i18n: { placeholder },
  suggestions,
  onClickSuggestion,
  inputProps,
  classNames,
  styles,
  renderItem,
  ...props
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

  const clearSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (input.current) {
      input.current.value = ''
      setSearchText('')
      input.current.focus()
    }
  }

  const showClearButton = searchText.length > 0
  const gameList = suggestions ?? []

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

  let searchResults = null
  if (gameList.length > 0) {
    searchResults = (
      <>
        {gameList.map((el) => (
          <button
            onClick={() => handleOnClickSuggestion(el)}
            key={el}
            className={searchBarStyles.searchResult}
          >
            {renderItem ? renderItem(el) : el}
          </button>
        ))}
      </>
    )
  } else if (searchText) {
    searchResults = <div>No results</div>
  }

  const dropdownClassnames: Record<string, boolean> = {}
  dropdownClassnames[searchBarStyles.hideDropdown] = searchResults === null

  return (
    <Popover
      width="target"
      classNames={{
        dropdown: cn(
          searchBarStyles.popoverDropdown,
          dropdownClassnames,
          classNames?.dropdown
        ),
        arrow: classNames?.arrow
      }}
      unstyled
      {...props}
    >
      <Popover.Target>
        <div
          className={cn(searchBarStyles.searchBar, classNames?.container)}
          style={styles?.container}
        >
          <button className={searchBarStyles.searchButton}>
            <MagnifyingGlass fill="var(--color-neutral-400)" />
          </button>
          <input
            ref={input}
            type="text"
            placeholder={placeholder}
            {...inputProps}
            className={cn('body-sm', inputProps?.className)}
            value={searchText}
          />
          {showClearButton && (
            <button
              className={searchBarStyles.clearButton}
              onClick={clearSearch}
            >
              <CloseButton fill="var(--color-neutral-400)" />
            </button>
          )}
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div
          className={cn(
            searchBarStyles.popoverDropdownList,
            classNames?.dropdownList
          )}
          style={styles?.dropdownList}
        >
          {searchResults}
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
