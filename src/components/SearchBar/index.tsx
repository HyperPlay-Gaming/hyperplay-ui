import React, { useEffect, useRef } from 'react'

import { CloseButton, MagnifyingGlass } from '@/assets/images'

import styles from './SearchBar.module.scss'

type Props = {
  searchText: string
  setSearchText: (text: string) => void
  i18n: {
    placeholder: string
  }
}

export default function SearchBar({ searchText, setSearchText, i18n: {placeholder} }: Props) {
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

  return (
    <div className={styles.searchBar}>
      <MagnifyingGlass fill="white" className={styles.magnifyingGlass} />
      <input ref={input} type="text" placeholder={placeholder} />
      {showClearButton && (
        <CloseButton
          fill="white"
          className={styles.closeButton}
          onClick={() => clearSearch()}
        />
      )}
    </div>
  )
}
