import React, { forwardRef } from 'react'

import {
  Tabs as MantTabs,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TabsTabProps,
  createPolymorphicComponent
} from '@mantine/core'

import styles from './Tabs.module.scss'

type TabsListPropsType = TabsListProps & { type?: 'outline' }
type TabsSubComponents = {
  List: React.ForwardRefExoticComponent<
    TabsListPropsType & React.RefAttributes<HTMLDivElement>
  >
  Tab: React.ForwardRefExoticComponent<
    TabsTabProps & React.RefAttributes<HTMLButtonElement>
  >
  Panel: React.ForwardRefExoticComponent<
    TabsPanelProps & React.RefAttributes<HTMLDivElement>
  >
}

const Tabs = createPolymorphicComponent<'div', TabsProps, TabsSubComponents>(
  forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
    return (
      <MantTabs
        {...props}
        ref={ref}
        className={`${props.className} ${styles.tabs}`}
      >
        {props.children}
      </MantTabs>
    )
  })
)
Tabs.displayName = 'HyplerPlayUiTabs'

const Tab = forwardRef<HTMLButtonElement, TabsTabProps>((props, ref) => (
  <MantTabs.Tab
    {...props}
    ref={ref}
    className={`${props.className} ${styles.tab}`}
  >
    {props.children}
  </MantTabs.Tab>
))
Tab.displayName = 'HyplerPlayUiTab'

const List = forwardRef<HTMLDivElement, TabsListPropsType>(
  ({ type, ...props }, ref) => (
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
)
List.displayName = 'HyplerPlayUiTabsList'

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>((props, ref) => (
  <MantTabs.Panel
    {...props}
    ref={ref}
    className={`${props.className} ${styles.panel}`}
  >
    {props.children}
  </MantTabs.Panel>
))
TabsPanel.displayName = 'HyplerPlayUiTabsPanel'

Tabs.Tab = Tab
Tabs.List = List
Tabs.Panel = TabsPanel

export default Tabs
