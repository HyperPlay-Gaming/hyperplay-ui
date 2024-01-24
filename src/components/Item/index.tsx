import { Avatar } from '@mantine/core'
import classNames from 'classnames'

import styles from './Item.module.scss'

export interface ItemProps {
  name: string
  image?: string
  label?: string
  large?: boolean
}

export default function Item(props: ItemProps) {
  const avatarClasses: Record<string, boolean> = {}
  avatarClasses[styles.large] = !!props.large

  const imgClasses = classNames(styles.avatarImageContainer, avatarClasses)
  return (
    <div className={styles.avatarContainer}>
      <Avatar
        radius="xl"
        src={props.image}
        classNames={{
          placeholder: imgClasses,
          image: imgClasses
        }}
      />
      <div className={styles.textContainer}>
        <div
          className={classNames(
            { menu: !props.large, title: !!props.large },
            styles.name
          )}
        >
          {props.name}
        </div>
        <div
          className={classNames(
            { menu: !props.large, 'title-sm': !!props.large },
            styles.label
          )}
        >
          {props.label}
        </div>
      </div>
    </div>
  )
}
