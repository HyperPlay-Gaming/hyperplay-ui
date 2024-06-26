import cn from 'classnames'

import { CardGeneric, CardGenericProps } from '../CardGeneric'
import styles from './index.module.scss'

export interface QuestCardProps extends CardGenericProps {
  title: string
  description: string
  selected?: boolean
}

export function QuestCard({
  title,
  description,
  className,
  selected,
  ...rest
}: QuestCardProps) {
  const classes: Record<string, boolean> = {}
  classes[styles.selected] = !!selected
  return (
    <CardGeneric
      className={cn(styles.card, className)}
      genericClassNames={{
        body: cn(styles.body, classes),
        image: styles.image,
        root: styles.root
      }}
      {...rest}
    >
      <div className={cn(styles.title, 'menu-item')}>{title}</div>
      <div className={cn(styles.description, 'body')}>{description}</div>
    </CardGeneric>
  )
}
