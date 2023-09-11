import React from 'react'

import { Modal, ModalProps } from '@mantine/core'
import cn from 'classnames'

import { CloseModalIcon } from '@/assets/images'

import styles from './PopUpModal.module.scss'

// see https://github.com/mantinedev/mantine/blob/master/src/mantine-core/src/ModalBase/ModalBase.tsx#L164
export const DEFAULT_TRANSITION_DURATION = 200

const PopUpModal = ({ classNames, ...props }: ModalProps) => {
  return (
    <Modal
      {...props}
      classNames={{
        ...classNames,
        content: cn(classNames?.content, styles.content),
        body: cn(classNames?.body, styles.body)
      }}
      withCloseButton={false}
    >
      {props.withCloseButton && (
        <button
          className={styles.closeButton}
          aria-label="close button"
          onClick={props.onClose}
        >
          <CloseModalIcon />
        </button>
      )}
      {props.children}
    </Modal>
  )
}

export default PopUpModal
