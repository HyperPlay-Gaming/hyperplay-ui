import React, { ReactElement } from 'react'

import { Accordion, AccordionProps, AccordionStylesNames } from '@mantine/core'
import cn from 'classnames'

import Button from '../Button'
import Checkbox from '../Checkbox'
import styles from './OptionsAccordion.module.scss'

// first key is accordion panel title, second is each option for that panel
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export interface Option {
  selected: boolean
  displayName?: string
}
export type PanelOptions = Record<string, Option>
export type OptionsType = Record<string, PanelOptions>
interface OptionsAccordionProps
  extends Omit<AccordionProps<boolean>, 'children'> {
  options: OptionsType
  setOptions: (options: OptionsType) => void
  classNames?: Partial<
    Record<
      AccordionStylesNames | 'checkboxBody' | 'optionRow' | 'panelList',
      string
    >
  >
}

export function OptionsAccordion({
  options,
  setOptions,
  classNames,
  ...props
}: OptionsAccordionProps) {
  function selectOnly(optionTitle: string, onlyOption: string) {
    const updatedOptions: OptionsType = options
    for (const optTitle in options) {
      for (const opt in options[optTitle]) {
        updatedOptions[optTitle][opt].selected = false
      }
    }

    updatedOptions[optionTitle][onlyOption].selected = true

    setOptions({
      ...options,
      ...updatedOptions
    })
  }

  function clearOptions(optionTitle: string) {
    const updatedOptions: OptionsType = options
    for (const opt in options[optionTitle]) {
      updatedOptions[optionTitle][opt].selected = false
    }
    setOptions({
      ...options,
      ...updatedOptions
    })
  }

  function makeAccordionItem(option: string) {
    const panelOptions = options[option]
    const items: ReactElement[] = []
    Object.keys(panelOptions).forEach((val, index) =>
      items.push(
        <div
          key={`${option}-${val}-${index}-item`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          className={cn(styles.optionRow, classNames?.optionRow)}
        >
          <Checkbox
            type="secondary"
            checked={options[option][val].selected}
            onChange={(ev) => {
              const updatedOption: OptionsType = {}
              updatedOption[option] = options[option]
              updatedOption[option][val].selected = ev.target.checked
              setOptions({
                ...options,
                ...updatedOption
              })
            }}
            data-testid={`${val}-checkbox`}
          >
            <div
              className={cn(
                styles.checkboxBody,
                classNames?.checkboxBody ? classNames?.checkboxBody : 'body'
              )}
            >
              {options[option][val].displayName ?? val}
            </div>
          </Checkbox>
          <Button
            type="link"
            size="small"
            onClick={() => selectOnly(option, val)}
            className={styles.onlyButton}
            data-testid={`${val}-only-button`}
          >
            Only
          </Button>
        </div>
      )
    )

    return (
      <Accordion.Item value={option} key={option}>
        <Accordion.Control>
          <div className={cn('title-sm', styles.sectionTitle)}>{option}</div>
        </Accordion.Control>
        <Accordion.Panel>
          <div className={cn(styles.panelList, classNames?.panelList)}>
            {items}
          </div>
          <Button
            key={`${option}-clear-filter`}
            type="tertiary"
            size="small"
            onClick={() => clearOptions(option)}
            className={styles.clearButton}
            data-testid={`${option}-clear-filter`}
          >
            <div className="button-sm">Clear filter</div>
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    )
  }

  const accordionItems: ReactElement[] = []
  Object.keys(options).forEach((val) => {
    accordionItems.push(makeAccordionItem(val))
  })

  return (
    // chevron position right is not being respected here
    <Accordion
      unstyled
      variant="contained"
      classNames={{
        panel: cn(styles.panel, classNames?.panel),
        item: cn(styles.item, classNames?.item),
        content: cn(styles.content, classNames?.content),
        control: cn(styles.control, classNames?.control),
        chevron: cn(styles.chevron, classNames?.chevron),
        root: cn(styles.root, classNames?.root),
        label: cn(styles.label, classNames?.label),
        icon: cn(styles.icon, classNames?.icon),
        itemTitle: cn(styles.itemTitle, classNames?.itemTitle)
      }}
      multiple
      {...props}
    >
      {accordionItems}
    </Accordion>
  )
}
