import React, { useState } from 'react'

import NavBar from '.'

export default {
  title: 'NavBar',
  component: NavBar
}

export const Default = () => <NavBar />

export const WithSearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const props = {
    showSearchBar: true,
    searchText,
    setSearchText,
    i18n: {
      placeholder: 'Search for games'
    }
  }

  return <NavBar {...props} />
}
