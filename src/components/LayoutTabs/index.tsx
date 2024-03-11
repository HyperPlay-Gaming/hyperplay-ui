import { Tabs, TabsProps } from '@mantine/core'
import cn from 'classnames'

import styles from './styles.module.scss'

function LayoutTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      defaultValue="basic"
      classNames={{
        tab: cn('body', styles.tab),
        list: styles.list
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
