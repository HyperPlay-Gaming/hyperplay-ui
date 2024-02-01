import { HTMLProps } from 'react'

import classNames from 'classnames'

import { GameDetails } from '../../types'
import styles from './index.module.scss'

interface GameDisplayDetailsProps extends HTMLProps<HTMLDivElement> {
  game: GameDetails
}

export default function GameDisplayDetails({
  game,
  className,
  ...props
}: GameDisplayDetailsProps) {
  return (
    <div className={classNames(styles.details, className)} {...props}>
      <img src={game.img} />
      <div className="menu">{game.title}</div>
    </div>
  )
}
