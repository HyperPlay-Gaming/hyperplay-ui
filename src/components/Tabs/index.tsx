import React, { forwardRef } from 'react'

import {
  TabProps as MantTabProps,
  Tabs as MantTabs,
  TabsListProps,
  TabsPanelProps,
  TabsProps
} from '@mantine/core'
import classNames from 'classnames'

import styles from './Tabs.module.scss'

export interface TabProps extends MantTabProps {
  styleType?: 'primary' | 'secondary'
}
type TabsListPropsType = TabsListProps & { type?: 'outline' }

type TabsType = typeof MantTabs & {
  List: React.ForwardRefExoticComponent<
    TabsListPropsType & React.RefAttributes<HTMLDivElement>
  >
  Tab: React.ForwardRefExoticComponent<TabProps>
}

const Tabs: TabsType = forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => (
    <MantTabs
      {...props}
      ref={ref}
      className={`${props.className} ${styles.tabs}`}
    >
      {props.children}
    </MantTabs>
  )
  /* eslint-disable-next-line */
) as any
Tabs.displayName = '@hyperplay/ui/Tabs'

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ styleType = 'primary', className, ...props }, ref) => {
    const tabClasses: Record<string, boolean> = {}
    tabClasses[styles.secondary] = styleType === 'secondary'

    return (
      <MantTabs.Tab
        {...props}
        ref={ref}
        className={classNames(className, styles.tab, tabClasses)}
      >
        {props.children}
      </MantTabs.Tab>
    )
  }
)
Tab.displayName = '@hyperplay/ui/Tab'
Tabs.Tab = Tab

const List = forwardRef<HTMLDivElement, TabsListPropsType>(
  ({ type, ...props }, ref) => {
    return (
      <MantTabs.List
        {...props}
        ref={ref}
        className={`${props.className} ${styles.list} ${
          type ? styles[type] : ''
        }`}
      >
        {props.children}
      </MantTabs.List>
    )
  }
)
List.displayName = '@hyperplay/ui/TabsList'
Tabs.List = List

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>((props, ref) => {
  return (
    <MantTabs.Panel
      {...props}
      ref={ref}
      className={`${props.className} ${styles.panel}`}
    >
      {props.children}
    </MantTabs.Panel>
  )
})
TabsPanel.displayName = '@hyperplay/ui/TabsPanel'
Tabs.Panel = TabsPanel

export default Tabs
