import React, { ReactElement } from 'react'

import { Accordion, AccordionProps } from '@mantine/core'

import Button from '../Button'
import Checkbox from '../Checkbox'
import styles from './OptionsAccordion.module.scss'

// first key is accordion panel title, second is each option for that panel
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type OptionsType = { [key: string]: { [key: string]: boolean } }
interface OptionsAccordionProps
  extends Omit<AccordionProps<boolean>, 'children'> {
  options: OptionsType
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>
}

export default function OptionsAccordion({
  options,
  setOptions,
  ...props
}: OptionsAccordionProps) {
  function selectOnly(optionTitle: string, onlyOption: string) {
    const updatedOptions: OptionsType = options
    for (const optTitle in options) {
      for (const opt in options[optTitle]) {
        updatedOptions[optTitle][opt] = false
      }
    }

    updatedOptions[optionTitle][onlyOption] = true

    setOptions((currentOptions) => ({
      ...currentOptions,
      ...updatedOptions
    }))
  }

  function clearOptions(optionTitle: string) {
    const updatedOptions: OptionsType = options
    for (const opt in options[optionTitle]) {
      updatedOptions[optionTitle][opt] = false
    }
    setOptions((currentOptions) => ({
      ...currentOptions,
      ...updatedOptions
    }))
  }

  function makeAccordionItem(option: string) {
    const panelOptions = options[option]
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const items: ReactElement<any>[] = []
    Object.keys(panelOptions).forEach((val) =>
      items.push(
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          className={styles.optionRow}
        >
          <Checkbox
            type="secondary"
            checked={options[option][val]}
            onChange={(ev) => {
              const updatedOption: OptionsType = {}
              updatedOption[option] = options[option]
              updatedOption[option][val] = ev.target.checked
              setOptions((currentOptions) => ({
                ...currentOptions,
                ...updatedOption
              }))
            }}
            data-testid={`${val}-checkbox`}
          >
            <div
              className="body"
              style={{ paddingLeft: 'var(--space-sm)', margin: 'auto 0px' }}
            >
              {val}
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

    items.push(
      <Button
        type="tertiary"
        size="small"
        onClick={() => clearOptions(option)}
        style={{
          marginTop: 'var(--space-sm)',
          border: '1.5px solid var(--color-stroke-01)'
        }}
        data-testid={`${option}-clear-filter`}
      >
        <div
          className="button-sm"
          style={{
            color: 'var(--color-neutral-100)'
          }}
        >
          Clear filter
        </div>
      </Button>
    )

    return (
      <Accordion.Item value={option} key={option}>
        <Accordion.Control>
          <div className="title-sm">{option}</div>
        </Accordion.Control>
        <Accordion.Panel>{items}</Accordion.Panel>
      </Accordion.Item>
    )
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const accordionItems: ReactElement<any>[] = []
  Object.keys(options).forEach((val) => {
    accordionItems.push(makeAccordionItem(val))
  })

  return (
    <Accordion
      variant="contained"
      radius={'var(--space-sm)'}
      classNames={{
        panel: styles.panel,
        item: styles.item,
        content: styles.content,
        control: styles.control
      }}
      multiple
      {...props}
    >
      {accordionItems}
    </Accordion>
  )
}
