import React, { useContext } from 'react'

import { useClipboard } from '@mantine/hooks'
import classNames from 'classnames'

export interface AddressContextType {
  resolveName: (address: string) => {
    data: string | undefined | null
    isLoading: boolean
  }
}

export const AddressContext = React.createContext<AddressContextType>({
  /* eslint-disable-next-line */
  resolveName: (address: string) => ({ data: undefined, isLoading: false })
})

export const AddressProvider = AddressContext.Provider

export interface AddressProps {
  address: string
  truncate: boolean
  classNames?: {
    button?: string
  }
}

export default function Address(props: AddressProps) {
  const clipboard = useClipboard()
  const { resolveName } = useContext(AddressContext)
  const { data: name } = resolveName(props.address)

  let label = name

  if (!label) {
    if (props.truncate) {
      label = `${props.address.slice(0, 6)}..${props.address.slice(-4)}`
    } else {
      label = props.address
    }
  }

  return (
    <button
      onClick={() => clipboard.copy(props.address)}
      className={classNames('body', props.classNames?.button)}
    >
      {label}
    </button>
  )
}
