import { HTMLProps } from 'react'

import classNames from 'classnames'

import { TrashCan } from '@/assets/images'

import { GameDetails } from '../../types'
import GameDisplayDetails from '../GameDisplayDetails'
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
      <GameDisplayDetails game={game} />
      <button onClick={game.onClick} data-testid={`selected-${game.gameId}`}>
        <TrashCan />
      </button>
    </div>
  )
}
