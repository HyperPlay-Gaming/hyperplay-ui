import { TrashCan } from '@/assets/images'

import { GameDetails } from '../../types'
import styles from './index.module.scss'

interface GameItemProps {
  game: GameDetails
}

export default function GameItem({ game }: GameItemProps) {
  return (
    <div className={styles.selectedGameContainer}>
      <div className={styles.details}>
        <img src={game.img} />
        <div className="title-sm">{game.title}</div>
      </div>
      <button onClick={game.onClick}>
        <TrashCan />
      </button>
    </div>
  )
}
