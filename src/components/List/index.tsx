import React, { HTMLProps, ReactElement } from 'react'

import { Divider } from '@mantine/core'
import classNames from 'classnames'

import styles from './List.module.scss'

export interface ListProps extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
  children?: ReactElement
}

export default function List({ children, className, ...props }: ListProps) {
  let childrenList = children
  let count = React.Children.count(childrenList)

  const childIsOneReactFragment =
    count === 1 && children?.type.toString() === 'Symbol(react.fragment)'
  if (childIsOneReactFragment) {
    // get the react fragment's children
    childrenList = children.props.children
    count = React.Children.count(children?.props.children)
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
