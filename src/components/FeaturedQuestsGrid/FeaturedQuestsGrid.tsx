import { UniqueIdentifier } from '@dnd-kit/core'
import { Listing } from '@valist/sdk/dist/typesApi'

import Button from '../Button'
import { SortableGameListingGrid } from '../SortableGameListingGrid'
import { GridContainer } from '../SortableGameListingGrid/GridContainer'
import { SortableGameListingCard } from '../SortableGameListingGrid/SortableGameListingCard'
import styles from './FeaturedQuestsGrid.module.scss'

interface FeaturedQuestsGridProps {
  options: Listing[]
  placeholderCount: number
  handlePublish: () => void
  setItems: (items: UniqueIdentifier[]) => void
  activeId: UniqueIdentifier | null
  setActiveId: (activeId: UniqueIdentifier | null) => void
}

export function FeaturedQuestsGrid({
  options,
  placeholderCount,
  handlePublish,
  setItems,
  activeId,
  setActiveId
}: FeaturedQuestsGridProps) {
  const items = options.map((option) => option.project_id)
  const availableSlots = Math.max(placeholderCount - items.length, 0)
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <span className="title">Featured</span>
          <span className="caption">{availableSlots} available slots</span>
        </div>
        <Button size="small" type="secondary" onClick={handlePublish}>
          Publish
        </Button>
      </div>
      <SortableGameListingGrid
        adjustScale={true}
        placeholdersCount={placeholderCount}
        removable={true}
        Container={(props) => <GridContainer {...props} columns={6} />}
        items={items}
        setItems={setItems}
        activeId={activeId}
        setActiveId={setActiveId}
        renderItem={({ index, ref, value: id, ...dndProps }) => {
          const activeGame = options.find((game) => game.project_id === id)
          if (!activeGame) {
            return <></>
          }
          const { project_meta } = activeGame
          return (
            <SortableGameListingCard
              {...dndProps}
              value={id}
              index={index}
              ref={ref as React.Ref<HTMLLIElement>}
              title={project_meta.name ?? ''}
              image={project_meta.image ?? ''}
              action={dndProps.dragOverlay ? 'none' : 'remove'}
              onAction={console.log}
            />
          )
        }}
      />
    </div>
  )
}
