import { forwardRef } from 'react'

import {
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
  TabsStylesNames
} from '@mantine/core'
import classNames from 'classnames'

import styles from './Tabs.module.scss'

/**
 * TabsTypes provides a simplified set of defaults that can be toggled for each Tabs component
 */
export interface TabsTypes {
  tab?: string
  list?: string
  panel?: string
}

type ExtendedTabs = typeof MantineTabs & {
  List: typeof MantineTabs.List
  Tab: typeof MantineTabs.Tab
  Panel: typeof MantineTabs.Panel
}

function getTabsClassNames(
  classNamesOverrides?: Partial<Record<TabsStylesNames, string>>,
  tabsType?: TabsTypes
) {
  const tabClasses: Record<string, boolean> = {}
  tabClasses[styles.secondary] = tabsType?.tab === 'secondary'

  const listClasses: Record<string, boolean> = {}
  listClasses[styles.outline] = tabsType?.list === 'outline'

  const defaultClassNames = {
    tab: classNames(styles.tab, tabClasses, classNamesOverrides?.tab),
    list: classNames(styles.list, listClasses, classNamesOverrides?.list),
    panel: classNames(styles.panel, classNamesOverrides?.panel),
    root: classNamesOverrides?.root
  }

  return defaultClassNames
}

const Tabs = forwardRef<HTMLDivElement, MantineTabsProps>(
  ({ children, ...props }, ref) => {
    return (
      <MantineTabs unstyled {...props} ref={ref}>
        {children}
      </MantineTabs>
    )
  }
) as ExtendedTabs

Tabs.List = MantineTabs.List
Tabs.Tab = MantineTabs.Tab
Tabs.Panel = MantineTabs.Panel
Tabs.displayName = MantineTabs.displayName
export { Tabs, getTabsClassNames }
export type { MantineTabsProps as TabProps, TabsStylesNames }
