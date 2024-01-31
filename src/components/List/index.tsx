import React, { HTMLProps, ReactElement } from 'react'

import { Divider } from '@mantine/core'
import classNames from 'classnames'

import styles from './List.module.scss'

export interface ListProps extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
  children?: ReactElement | ReactElement[]
}

export default function List({ children, className, ...props }: ListProps) {
  let childrenList = children
  let count = React.Children.count(childrenList)

  const firstChild = Array.isArray(children) ? children?.at(0) : children
  const childIsOneReactFragment =
    count === 1 && firstChild?.type.toString() === 'Symbol(react.fragment)'
  if (childIsOneReactFragment) {
    // get the react fragment's children
    childrenList = firstChild?.props.children
    count = React.Children.count(firstChild?.props.children)
  }

  return (
    <div className={classNames(styles.list, className)} {...props}>
      {React.Children.map(childrenList, (child, index) => (
        <>
          {child}
          {index !== count - 1 && <Divider />}
        </>
      ))}
    </div>
  )
}
