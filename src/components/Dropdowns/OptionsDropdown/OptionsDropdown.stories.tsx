import React, { useState } from 'react'

import OptionsDropdown from '.'

export default {
  title: 'Dropdowns/Options Dropdown',
  component: OptionsDropdown
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

export const Default = () => {
  const [options, setOptions] = useState(Genre)
  return (
    <OptionsDropdown
      options={options}
      setOptions={setOptions}
      title="Options"
    />
  )
}

export const Stacked = () => {
  const [genreOptions, setGenreOptions] = useState(Genre)
  const [systemsOptions, setSystemsOptions] = useState(Systems)
  const [versionOptions, setVersionOptions] = useState(Version)
  const [othersOptions, setOthersOptions] = useState(Others)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <OptionsDropdown
        options={genreOptions}
        setOptions={setGenreOptions}
        title="Genre"
      />
      <OptionsDropdown
        options={systemsOptions}
        setOptions={setSystemsOptions}
        title="Systems"
      />
      <OptionsDropdown
        options={versionOptions}
        setOptions={setVersionOptions}
        title="Version"
      />
      <OptionsDropdown
        options={othersOptions}
        setOptions={setOthersOptions}
        title="Others"
      />
    </div>
  )
}
