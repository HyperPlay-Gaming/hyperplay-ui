/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { createPortal } from 'react-dom'

import {
  Active,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MeasuringConfiguration,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  SortableContext,
  SortingStrategy,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable
} from '@dnd-kit/sortable'

import { GridContainer, GridContainerProps } from './GridContainer'
import { SortableGameListingCard } from './SortableGameListingCard'
import styles from './SortableGameListingGrid.module.scss'

export type SortableGameListingGridProps = {
  activationConstraint?: PointerActivationConstraint
  animateLayoutChanges?: AnimateLayoutChanges
  adjustScale?: boolean
  collisionDetection?: CollisionDetection
  coordinateGetter?: KeyboardCoordinateGetter
  Container?: React.ComponentType<
    GridContainerProps & React.RefAttributes<HTMLUListElement>
  >
  dropAnimation?: DropAnimation | null
  getNewIndex?: NewIndexGetter
  handle?: boolean
  itemCount?: number
  placeholdersCount?: number
  items: UniqueIdentifier[]
  setItems: (items: UniqueIdentifier[]) => void
  activeId: UniqueIdentifier | null
  setActiveId: (activeId: UniqueIdentifier | null) => void
  measuring?: MeasuringConfiguration
  modifiers?: Modifiers
  getItemProps: (id: UniqueIdentifier) => {
    title: string
    image: string
  }
  removable?: boolean
  reorderItems?: typeof arrayMove
  strategy?: SortingStrategy
  style?: React.CSSProperties
  useDragOverlay?: boolean
  getItemStyles?(args: {
    id: UniqueIdentifier
    index: number
    isSorting: boolean
    isDragOverlay: boolean
    overIndex: number
    isDragging: boolean
  }): React.CSSProperties
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null
    index: number
    isDragging: boolean
    id: UniqueIdentifier
  }): React.CSSProperties
  isDisabled?(id: UniqueIdentifier): boolean
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

export function SortableGameListingGrid({
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  Container = GridContainer,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  items,
  setItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
  placeholdersCount = 0,
  activeId,
  setActiveId,
  getItemProps
}: SortableGameListingGridProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint
    }),
    useSensor(TouchSensor, {
      activationConstraint
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter
    })
  )

  const getIndex = (id: UniqueIdentifier) => items.indexOf(id)

  const activeIndex = activeId !== null ? getIndex(activeId) : -1

  const handleRemove = removable
    ? (id: UniqueIdentifier) => {
        const newItems = items.filter((item) => item !== id)
        setItems(newItems)
      }
    : undefined

  const placeholderSpotsCount = Math.max(placeholdersCount - items.length, 0)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return
        }

        setActiveId(active.id)
      }}
      onDragEnd={({ over }) => {
        setActiveId(null)
        if (over) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            const newItems = reorderItems(items, activeIndex, overIndex)
            setItems(newItems)
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <SortableContext items={items} strategy={strategy}>
        <Container columns={placeholdersCount}>
          {items.map((value, index) => (
            <SortableItem
              getItemProps={getItemProps}
              key={value}
              id={value}
              handle={handle}
              index={index}
              style={getItemStyles}
              wrapperStyle={wrapperStyle}
              disabled={isDisabled(value)}
              onRemove={handleRemove}
              animateLayoutChanges={animateLayoutChanges}
              useDragOverlay={useDragOverlay}
              getNewIndex={getNewIndex}
            />
          ))}
          {Array.from({ length: placeholderSpotsCount }).map((_, index) => (
            <div key={index} className={styles.cardPlaceholder}>
              <h4>#{index + items.length + 1}</h4>
            </div>
          ))}
        </Container>
      </SortableContext>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId !== null ? (
                <SortableGameListingCard
                  getItemProps={getItemProps}
                  value={items[activeIndex]}
                  handle={handle}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex]
                  })}
                  style={getItemStyles({
                    id: items[activeIndex],
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  )
}

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges
  disabled?: boolean
  getNewIndex?: NewIndexGetter
  id: UniqueIdentifier
  index: number
  handle: boolean
  useDragOverlay?: boolean
  onRemove?(id: UniqueIdentifier): void
  style(values: any): React.CSSProperties
  getItemProps: SortableGameListingGridProps['getItemProps']
  wrapperStyle: SortableGameListingGridProps['wrapperStyle']
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  index,
  onRemove,
  style,
  useDragOverlay,
  wrapperStyle,
  getItemProps
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex
  })

  return (
    <SortableGameListingCard
      getItemProps={getItemProps}
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef
            }
          : undefined
      }
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  )
}
