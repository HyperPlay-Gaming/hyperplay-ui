import React, { forwardRef } from 'react'

import {
  Tabs as MantTabs,
  TabProps,
  TabsListProps,
  TabsPanelProps,
  TabsProps
} from '@mantine/core'

import styles from './Tabs.module.scss'

type TabsListPropsType = TabsListProps & { type?: 'outline' }
type TabsType = typeof MantTabs & {
  List: React.ForwardRefExoticComponent<
    TabsListPropsType & React.RefAttributes<HTMLDivElement>
  >
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

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  return (
    <MantTabs.Tab
      {...props}
      ref={ref}
      className={`${props.className} ${styles.tab}`}
    >
      {props.children}
    </MantTabs.Tab>
  )
})
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
