import React, { useState } from 'react'

import Dropdown from '.'

export default {
  title: 'Dropdowns/Dropdown',
  component: Dropdown
}

const data = [
  { text: 'Alphabetical A-Z' },
  { text: 'Favorites' },
  { text: 'Sort by Status' }
]
export const Default = () => {
  const [selected, setSelected] = useState(data[0])
  return (
    <Dropdown
      options={data}
      onItemChange={setSelected}
      selected={selected}
      targetWidth={200}
    />
  )
}

export const TitleSm = () => {
  const [selected, setSelected] = useState(data[0])
  return (
    <Dropdown
      options={data}
      onItemChange={setSelected}
      selected={selected}
      targetWidth={200}
      dropdownButtonDivProps={{ className: 'title-sm' }}
    />
  )
}
