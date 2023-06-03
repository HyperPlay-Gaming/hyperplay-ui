import React, { useState } from 'react'

import OptionsAccordion from '.'

export default {
  title: 'Options Accordion',
  component: OptionsAccordion
}

type OptionsType = { [key: string]: boolean }
const Genre: OptionsType = {
  Action: false,
  Adventure: false,
  'Role-Playing': false,
  Strategy: false,
  Simulation: false,
  Sports: false,
  Racing: false
}

const Systems: OptionsType = {
  Windows: false,
  Mac: false,
  Linux: false,
  Browser: false
}

const Version: OptionsType = {
  Alpha: false,
  Beta: false,
  Stable: false
}

const Others: OptionsType = {
  'Token required': false,
  Downloaded: false,
  'Show hidden': false,
  'Show non-available': false
}

const AllFilters: { [key: string]: OptionsType } = {
  Genre: Genre,
  Systems: Systems,
  Version: Version,
  Others: Others
}

export const Default = () => {
  const [options, setOptions] = useState(AllFilters)
  return <OptionsAccordion options={options} setOptions={setOptions} />
}
