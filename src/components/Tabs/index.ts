import { TabsStylesNames } from '@mantine/core'
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

export function getTabsClassNames(
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
    panel: classNames(styles.panel, classNamesOverrides?.panel)
  }

  return defaultClassNames
}
