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
  supportAddress?: string
}

export default function Address(props: AddressProps) {
  const clipboard = useClipboard()
  const { resolveName } = useContext(AddressContext)
  const { data: name } = resolveName(props.address)

  let label = name

  if (!label) {
    if (props.address === props?.supportAddress) {
      label = 'HyperPlay Support'
    } else if (props.truncate) {
      label = `${props.address.slice(0, 6)}..${props.address.slice(-4)}`
    } else {
      label = props.address
    }
  }

  return (
    <button
      onClick={() => clipboard.copy(props.address)}
      /**
       * if we try to override body with a classname that comes before body in the typography style sheet,
       * it will not override and remain styled by .body. So we disable body if a classname is passed in
       */
      className={classNames(
        { body: !props.classNames?.button },
        props.classNames?.button
      )}
    >
      {label}
    </button>
  )
}
