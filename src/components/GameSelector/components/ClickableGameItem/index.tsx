import { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

import { GameDetails } from '../../types'
import GameDisplayDetails from '../GameDisplayDetails'
import styles from './index.module.scss'

interface ClickableGameItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  game: GameDetails
}

export default function ClickableGameItem({
  game,
  className,
  ...props
}: ClickableGameItemProps) {
  return (
    <button className={classNames(styles.gameContainer, className)} onClick={game.onClick} {...props}>
      <GameDisplayDetails game={game} />
    </button>
  )
}
