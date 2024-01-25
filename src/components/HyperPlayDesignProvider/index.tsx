import React from 'react'

import { MantineProvider, MantineProviderProps } from '@mantine/core'
import '@mantine/core/styles.css'

export type HyperPlayDesignProviderProps = MantineProviderProps & {
  children: React.ReactNode
}

const HyperPlayDesignProvider = ({
  children,
  theme = {},
  ...props
}: HyperPlayDesignProviderProps) => {
  return (
    <MantineProvider theme={theme} {...props}>
      {children}
    </MantineProvider>
  )
}

export default HyperPlayDesignProvider
