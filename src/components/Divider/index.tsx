import * as React from 'react'

import { Divider as MantineDivider } from '@mantine/core'
import cn from 'classnames'

import styles from './Divider.module.scss'

const Divider = React.forwardRef<
  React.ElementRef<typeof MantineDivider>,
  React.ComponentPropsWithoutRef<typeof MantineDivider>
>(({ className, ...props }, ref) => (
  <MantineDivider ref={ref} className={cn(className, styles.root)} {...props} />
))

Divider.displayName = MantineDivider.displayName

export default Divider
