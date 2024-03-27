import React, { useEffect, useState } from 'react'

import cn from 'classnames'

import Button, { ButtonProps } from '@/components/Button'
import Collapse, { CollapseProps } from '@/components/Collapse'

import styles from './CollapseList.module.scss'

export const defaultI81n: CollapseListSectionI18nProp = {
  expandAll: 'Expand All',
  collapseAll: 'Collapse All'
}

interface CollapseListProps {
  title: string
  subtitle?: string
  content: string | React.ReactNode
}

export interface CollapseListSectionI18nProp {
  expandAll?: 'Expand All'
  collapseAll?: 'Collapse All'
}

interface CollapseListSectionClassNamesProp {
  collapse?: CollapseProps['classNames']
  collapseList?: {
    root?: string
    title?: string
    intro?: string
    list?: string
    expandButtonRoot?: string
  }
}

export interface CollapseListSectionProps {
  title?: string
  list: CollapseListProps[]
  expandButton?: ButtonProps
  isExpanded?: boolean
  classNames?: CollapseListSectionClassNamesProp
  i18n?: CollapseListSectionI18nProp
}

const CollapseListSection: React.FC<CollapseListSectionProps> = ({
  title,
  expandButton,
  classNames = {},
  isExpanded = false,
  list = [],
  i18n = defaultI81n
}) => {
  const [collapseStates, setCollapseStates] = useState<Record<number, boolean>>(
    {}
  )
  const [areAllExpanded, setAreAllExpanded] = useState<boolean>(isExpanded)

  useEffect(() => {
    setCollapseStates(
      list.reduce((acc, _, index) => ({ ...acc, [index]: isExpanded }), {})
    )
  }, [list])

  const handleToggle = (index: number) => (isNowOpen: boolean) => {
    setCollapseStates((prev) => ({ ...prev, [index]: isNowOpen }))

    const allExpanded = Object.values({
      ...collapseStates,
      [index]: isNowOpen
    }).every((isOpen) => isOpen)
    setAreAllExpanded(allExpanded)
  }

  const toggleAll = () => {
    setAreAllExpanded(!areAllExpanded)
    setCollapseStates(
      list.reduce((acc, _, index) => ({ ...acc, [index]: !areAllExpanded }), {})
    )
  }

  return (
    <div className={cn(styles.root, classNames?.collapseList?.root)}>
      <div className={cn(styles.intro, classNames?.collapseList?.intro)}>
        {title ? (
          <h2 className={cn('title', classNames?.collapseList?.title)}>
            {title}
          </h2>
        ) : null}
        {list.length > 1 ? (
          <Button
            type="tertiary"
            size="small"
            className={cn(
              styles.expandAllButton,
              classNames?.collapseList?.expandButtonRoot
            )}
            onClick={toggleAll}
            {...expandButton}
          >
            {areAllExpanded ? i18n.collapseAll : i18n.expandAll}
          </Button>
        ) : null}
      </div>
      <div className={cn(styles.list, classNames?.collapseList?.list)}>
        {list.map(({ content, ...props }, index) => (
          <Collapse
            key={index}
            tabIndex={index}
            isOpen={collapseStates[index]}
            onToggle={handleToggle(index)}
            classNames={{
              root: cn(styles.collapseRoot, classNames?.collapse?.root),
              open: cn(styles.open, classNames?.collapse?.open),
              title: cn(styles.collapseTitle, classNames?.collapse?.title),
              content: cn(
                styles.collapseContent,
                classNames?.collapse?.content
              ),
              toggleButton: cn(
                styles.collapseToggleButton,
                classNames?.collapse?.toggleButton
              ),
              ...(classNames.collapse || {})
            }}
            {...props}
          >
            {typeof content === 'string' ? content?.trim() : content}
          </Collapse>
        ))}
      </div>
    </div>
  )
}

export default CollapseListSection
