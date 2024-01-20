import { HTMLProps } from 'react'

import classNames from 'classnames'

import { TrashCan } from '@/assets/images'

import { GameDetails } from '../../types'
import styles from './index.module.scss'

interface GameItemProps extends HTMLProps<HTMLDivElement> {
  game: GameDetails
}

export default function GameItem({ game, className, ...props }: GameItemProps) {
  return (
    <div
      className={classNames(styles.selectedGameContainer, className)}
      {...props}
    >
      <div className={styles.details}>
        <img src={game.img} />
        <div className="menu">{game.title}</div>
      </div>
      <button onClick={game.onClick}>
        <TrashCan />
      </button>
    </div>
  )
}
