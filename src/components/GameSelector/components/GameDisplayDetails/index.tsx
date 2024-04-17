import { HTMLProps } from 'react'

import { IconCheck } from '@tabler/icons-react'
import classNames from 'classnames'

import { GameDetails } from '../../types'
import styles from './index.module.scss'

interface GameDisplayDetailsProps extends HTMLProps<HTMLDivElement> {
  game: GameDetails
  selected?: boolean
}

export default function GameDisplayDetails({
  game,
  className,
  selected,
  ...props
}: GameDisplayDetailsProps) {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      <div className={classNames(styles.details, className)}>
        <img src={game.img} />
        <div className="menu">{game.title}</div>
      </div>
      {selected && <IconCheck size={24} color="var(--color-success-200)" />}
    </div>
  )
}
