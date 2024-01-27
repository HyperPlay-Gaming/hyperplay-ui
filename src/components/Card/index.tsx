import { Paper, PaperProps } from '@mantine/core'

import styles from './Card.module.scss'

export interface CardProps extends PaperProps {
  children?: React.ReactNode
}

export default function Card({ children, ...props }: CardProps) {
  return (
    <Paper className={styles.root} {...props}>
      {children}
    </Paper>
  )
}
