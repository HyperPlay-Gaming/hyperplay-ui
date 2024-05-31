import cn from 'classnames'

import { CardGeneric, CardGenericProps } from '../CardGeneric'
import styles from './index.module.scss'

export interface QuestCardProps extends CardGenericProps {
  title: string
  description: string
}

export function QuestCard({
  title,
  description,
  className,
  ...rest
}: QuestCardProps) {
  return (
    <CardGeneric className={cn(styles.card, className)} {...rest}>
      <div className={cn(styles.title, 'body')}>{title}</div>
      <div>{description}</div>
    </CardGeneric>
  )
}
