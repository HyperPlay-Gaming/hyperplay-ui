import React, { useEffect, useState } from 'react'

import cn from 'classnames'

import Button, { ButtonProps } from '@/components/Button'
import Collapse, { CollapseProps } from '@/components/Collapse'

import styles from './DetailsList.module.scss'

export const defaultI81n: DetailsListSectionI18nProp = {
  expandAll: 'Expand All',
  collapseAll: 'Collapse All'
}

interface DetailsListProps {
  title: string
  subtitle?: string
  content: string | React.ReactNode
}

export interface DetailsListSectionI18nProp {
  expandAll?: 'Expand All'
  collapseAll?: 'Collapse All'
}

interface DetailsListSectionClassNamesProp {
  collapse?: CollapseProps['classNames']
  detailsList?: {
    root?: string
    title?: string
    intro?: string
    list: string
    expandButtonRoot?: string
  }
}

export interface DetailsListSectionProps {
  title: string
  list: DetailsListProps[]
  expandButton?: ButtonProps
  isExpanded?: boolean
  classNames?: DetailsListSectionClassNamesProp
  i18n?: DetailsListSectionI18nProp
}

const DetailsListSection: React.FC<DetailsListSectionProps> = ({
  title,
  expandButton,
  isExpanded = false,
  classNames = {},
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
    <div className={cn(styles.root, classNames?.detailsList?.root)}>
      <div className={cn(styles.intro, classNames?.detailsList?.intro)}>
        <h2 className={cn('title', classNames?.detailsList?.title)}>{title}</h2>
        {list.length > 1 ? (
          <Button
            type="tertiary"
            size="small"
            className={cn(
              styles.expandAllButton,
              classNames?.detailsList?.expandButtonRoot
            )}
            onClick={toggleAll}
            {...expandButton}
          >
            {areAllExpanded ? i18n.collapseAll : i18n.expandAll}
          </Button>
        ) : null}
      </div>
      <div className={cn(styles.list, classNames?.detailsList?.list)}>
        {list.map(({ content, ...props }, index) => (
          <Collapse
            key={index}
            tabIndex={index}
            isOpen={collapseStates[index] !== undefined ?? isExpanded}
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

export default DetailsListSection
