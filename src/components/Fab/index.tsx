import React, { useState } from 'react'

import { useClickOutside, useMediaQuery } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'

import styles from './Fab.module.scss'
import Button from './components/Button'

export interface FabProps {
  children?: React.ReactNode
}

export const Fab = (props: FabProps) => {
  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const isHidden = useMediaQuery('(min-width: 1200px)', false)
  if (isHidden) return <></>

  let overlay = null
  if (opened) {
    overlay = <div className={styles.overlay} />
  }

  return (
    <>
      {overlay}
      <div ref={ref} className={styles.wrapper}>
        {opened && props.children}
        <Button onClick={() => setOpened(!opened)}>
          <IconPlus size={32} />
        </Button>
      </div>
    </>
  )
}

Fab.Button = Button

export default Fab
