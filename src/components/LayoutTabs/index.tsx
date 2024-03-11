import { Tabs, TabsProps } from '@mantine/core'
import cn from 'classnames'

import styles from './styles.module.scss'

function LayoutTabs({ classNames, ...props }: TabsProps) {
  const propsClassNames = (classNames ?? {}) as Record<string, string>
  return (
    <Tabs
      unstyled
      defaultValue="basic"
      classNames={{
        ...classNames,
        tab: cn('body', styles.tab, propsClassNames?.tab),
        list: cn(styles.list, propsClassNames?.list)
      }}
      {...props}
    >
      {props.children}
    </Tabs>
  )
}

LayoutTabs.Tab = Tabs.Tab
LayoutTabs.List = Tabs.List
LayoutTabs.Panel = Tabs.Panel

export default LayoutTabs
