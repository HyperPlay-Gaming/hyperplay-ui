import droid from '@/assets/Droid.png'

import Button from '../Button'
import { GameListingCard } from '../GameListingCard'
import styles from './FeaturedQuestsGrid.module.scss'

const gameImage = (
  <img src={droid} alt="Game" style={{ width: '100%', height: '100%' }} />
)

export function FeaturedQuestsGrid() {
  const count = 2
  const totalSlots = 6

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <span className="title">Featured</span>
          <span className="caption">{totalSlots - count} available slots</span>
        </div>
        <Button size="small" type="secondary">
          Publish
        </Button>
      </div>
      <div className={styles.cardsGrid}>
        {Array.from({ length: count }).map((_, index) => (
          <GameListingCard
            key={index}
            title={`Featured Quest ${index + 1}`}
            image={gameImage}
            action="none"
            onAction={() => {}}
          />
        ))}
        {Array.from({ length: totalSlots - count }).map((_, index) => (
          <div className={styles.cardPlaceholder} key={index}>
            <h4>#{index + count + 1}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
