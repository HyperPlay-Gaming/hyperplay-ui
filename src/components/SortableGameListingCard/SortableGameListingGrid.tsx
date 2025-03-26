/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
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

import { Item } from './Item'
import { List } from './List'
import { Wrapper } from './Wrapper'

const defaultInitializer = (index: number) => index

function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

export type SortableGameListingGridProps = {
  activationConstraint?: PointerActivationConstraint
  animateLayoutChanges?: AnimateLayoutChanges
  adjustScale?: boolean
  collisionDetection?: CollisionDetection
  coordinateGetter?: KeyboardCoordinateGetter
  Container?: any // To-do: Fix me
  dropAnimation?: DropAnimation | null
  getNewIndex?: NewIndexGetter
  handle?: boolean
  itemCount?: number
  items?: UniqueIdentifier[]
  measuring?: MeasuringConfiguration
  modifiers?: Modifiers
  renderItem?: any
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
  Container = List,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  itemCount = 16,
  items: initialItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({})
}: SortableGameListingGridProps) {
  const [items, setItems] = useState<UniqueIdentifier[]>(
    () =>
      initialItems ?? createRange<UniqueIdentifier>(itemCount, (index) => index)
  )
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
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
    ? (id: UniqueIdentifier) =>
        setItems((items) => items.filter((item) => item !== id))
    : undefined

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
            setItems((items) => reorderItems(items, activeIndex, overIndex))
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style} center>
        <SortableContext items={items} strategy={strategy}>
          <Container>
            {items.map((value, index) => (
              <SortableItem
                key={value}
                id={value}
                handle={handle}
                index={index}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                disabled={isDisabled(value)}
                renderItem={renderItem}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId !== null ? (
                <Item
                  value={items[activeIndex]}
                  handle={handle}
                  renderItem={renderItem}
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
  renderItem?(args: any): React.ReactElement
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
  renderItem,
  useDragOverlay,
  wrapperStyle
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
    <Item
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
      renderItem={renderItem}
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
