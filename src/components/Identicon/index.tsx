import React from 'react'

import { Avatar, Center, Tooltip } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import classNames from 'classnames'
import makeBlockie from 'ethereum-blockies-base64'

import styles from './Identicon.module.scss'

export interface IdenticonProps {
  value: string
  classNames?: {
    button?: string
  }
}

export default function Identicon(props: IdenticonProps) {
  const src = makeBlockie(props.value)
  const clipboard = useClipboard()

  const trunc = `${props.value.slice(0, 6)}..${props.value.slice(-4)}`
  const label = <Center>{clipboard.copied ? 'copied' : trunc}</Center>

  return (
    <Tooltip
      position="bottom"
      label={label}
      className={classNames('caption', styles.tooltip)}
    >
      <button
        onClick={() => clipboard.copy(props.value)}
        className={classNames(styles.button, props.classNames?.button)}
      >
        <Avatar
          src={src}
          classNames={{ root: styles.root, image: styles.image }}
        />
      </button>
    </Tooltip>
  )
}
