import React from 'react'

import {
  AppShell as MantineAppShell,
  AppShellProps as MantineAppShellProps,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export interface AppShellProps extends MantineAppShellProps {
  children?: React.ReactNode
  padding?: number
  hideNavbar?: boolean
}

export default function AppShell(props: AppShellProps) {
  const theme = useMantineTheme()
  const showFooter = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`,
    false
  )

  return (
    <MantineAppShell
      padding={props.padding}
      footer={showFooter ? props.footer : undefined}
      navbar={props.hideNavbar ? undefined : props.navbar}
      header={props.header}
      {...props}
    >
      {props.children}
    </MantineAppShell>
  )
}

AppShell.defaultProps = {
  padding: 40
}
