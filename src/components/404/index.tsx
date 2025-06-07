import { Grid, Text } from '@mantine/core'

import gif from '@/assets/errors/404.gif'

import styles from './404.module.scss'

export interface _404Props {
  message: string
  action?: React.JSX.Element
  i18n?: {
    oops?: string
  }
}

export default function _404({
  i18n = { oops: 'Oops!!! 😵' },
  ...props
}: _404Props): React.JSX.Element {
  return (
    <Grid>
      <Grid.Col>
        <Text className={styles.title}>{i18n.oops}‍</Text>
        <Text className={styles.message}>{props.message}</Text>
        {props.action}
      </Grid.Col>
      <Grid.Col>
        <img className={styles.image} src={gif} />
      </Grid.Col>
    </Grid>
  )
}
