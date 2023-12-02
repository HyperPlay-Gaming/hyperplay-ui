import React, { HTMLProps } from 'react'
import styles from './Loading.module.scss'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loading(props: HTMLProps<HTMLDivElement>){
  return (<div className={styles.loadingSpinnerContainer} {...props}><FontAwesomeIcon
    size={'2x'}
    fill="var(--color-neutral-100)"
    icon={faSpinner}
    className={styles.spinning}
  /></div>)
}