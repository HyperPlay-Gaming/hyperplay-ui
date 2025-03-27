import { HTMLAttributes } from 'react'

import classNames from 'classnames'

import styles from './PlaceholderCard.module.scss'

type PlaceholderCardProps = HTMLAttributes<HTMLDivElement> & {
  index: number
}

export function PlaceholderCard({
  index,
  className,
  ...props
}: PlaceholderCardProps) {
  return (
    <div className={classNames(styles.cardPlaceholder, className)} {...props}>
      <h4>#{index}</h4>
    </div>
  )
}
