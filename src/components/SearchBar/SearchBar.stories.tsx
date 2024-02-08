import React, { useState } from 'react'

import SearchBar from './index'

export default {
  title: 'SearchBar',
  component: SearchBar
}

export const Default: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  return <SearchBar searchText={searchText} setSearchText={setSearchText} />
}
