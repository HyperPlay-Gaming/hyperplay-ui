import React from 'react'

import '@mantine/carousel/styles.css'
import { MantineProvider, MantineProviderProps } from '@mantine/core'
import '@mantine/core/styles.css'

// import HyperPlay styles after mantine to override their defaults with our design system
import '../../../src/fonts.css'
import '../../../src/index.scss'

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
