import React, { CSSProperties, useCallback, useRef } from 'react'

import debounce from 'lodash/debounce'
import { Popover, PopoverProps } from '@mantine/core'
import cn from 'classnames'

import { CloseButton, MagnifyingGlass } from '@/assets/images'

import searchBarStyles from './SearchBar.module.scss'

interface Props extends PopoverProps {
  onClickSuggestion?: (suggestion: string) => void
  setSearchText: (text: string) => void
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
  itemComponent?: React.ComponentType<{ suggestion: string }>
}

export default function SearchBar({
  i18n: { placeholder },
  setSearchText,
  suggestions,
  onClickSuggestion,
  inputProps,
  classNames,
  styles,
  itemComponent: ItemComponent,
  ...props
}: Props) {
  const input = useRef<HTMLInputElement>(null)

  const setInputValue = useCallback(
    (val: string) => {
      if (input.current) {
        input.current.value = val
        setSearchText(val)
        input.current.focus()
      }
    },
    [input]
  )

  const clearSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    setInputValue('')
  }

  const searchTextValue = input.current?.value
  const showClearButton = (searchTextValue?.length ?? 0) > 0
  const gameList = suggestions ?? []

  const handleOnClickSuggestion = (suggestion: string) => {
    if (onClickSuggestion) {
      onClickSuggestion(suggestion)
      return
    }
    if (input.current) {
      setInputValue(suggestion)
    }
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
            {ItemComponent ? <ItemComponent suggestion={el} /> : el}
          </button>
        ))}
      </>
    )
  } else if (searchTextValue) {
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
            onInput={debounce((ev) => {
              if (inputProps?.onChange) {
                inputProps.onChange(ev)
              }
              setSearchText(ev.target.value)
            }, 350)}
            className={cn('body-sm', inputProps?.className)}
          />
          {showClearButton ? (
            <button
              className={searchBarStyles.clearButton}
              onClick={clearSearch}
            >
              <CloseButton fill="var(--color-neutral-400)" />
            </button>
          ) : null}
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
