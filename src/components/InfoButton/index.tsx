import { IconCircleX, IconInfoCircle } from '@tabler/icons-react'

import styles from './InfoButton.module.scss'

export interface InfoButtonProps {
  opened: boolean
  onClick?: () => void
}

export default function InfoButton(props: InfoButtonProps) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {!props.opened && (
        <>
          <IconInfoCircle size={24} />
          <div className="caption">Info</div>
        </>
      )}
      {props.opened && (
        <>
          <IconCircleX size={24} />
          <div className="caption">Close</div>
        </>
      )}
    </button>
  )
}
