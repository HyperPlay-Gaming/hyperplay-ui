import { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

import { GameDetails } from '../../types'
import GameDisplayDetails from '../GameDisplayDetails'
import styles from './index.module.scss'

interface ClickableGameItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  game: GameDetails
}

export default function ClickableGameItem({
  game,
  selected,
  className,
  ...props
}: ClickableGameItemProps) {
  return (
    <button
      className={classNames(styles.gameContainer, className)}
      onClick={game.onClick}
      type="button"
      {...props}
    >
      <GameDisplayDetails game={game} selected={selected} />
    </button>
  )
}
