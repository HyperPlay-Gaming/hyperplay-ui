import { Checkbox } from '@mantine/core'

import styles from './CheckboxList.module.scss'

export interface CheckboxListProps {
  items: {
    label: string
    checked: boolean
  }[]
}

export default function CheckboxList(props: CheckboxListProps): JSX.Element {
  return (
    <>
      {props?.items?.map((item, index) => (
        <Checkbox
          key={index}
          label={item.label}
          checked={item.checked}
          classNames={{
            root: styles.root,
            input: styles.input,
            icon: styles.icon,
            body: styles.body
          }}
          radius="lg"
          readOnly
        />
      ))}
    </>
  )
}
