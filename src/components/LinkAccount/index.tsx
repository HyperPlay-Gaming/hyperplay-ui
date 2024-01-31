import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { LinkIcon } from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'

import styles from './LinkAccount.module.scss'

interface I18n {
  connectTitle: string
  connectSubtitle: string
  callToActionText: string
}

export interface LinkAccountModalProps extends HTMLProps<HTMLDivElement> {
  onClose: () => void
  onConnectTap: () => void
  i18n?: I18n
}

const LinkAccount = ({
  className,
  onConnectTap,
  i18n = {
    connectTitle: 'Link to your HyperPlay account',
    connectSubtitle: 'Sign in to provider to link your HyperPlay account.',
    callToActionText: 'Go to provider sign in '
  },
  ...props
}: LinkAccountModalProps) => {
  return (
    <Modal.Root {...props} className={cn(className, styles.root)}>
      <Modal.Header>
        <Modal.Title className={cn(styles.row, styles.title)}>
          {i18n.connectTitle}
        </Modal.Title>
        <Modal.Body>
          <div className={cn(styles.row, styles.subtitle)}>
            {i18n.connectSubtitle}
          </div>
          <div className={styles.row}>
            <div className={styles.icon}>
              <LinkIcon />
            </div>
          </div>
          <div className={styles.row}>
            <Button
              type="secondary"
              onClick={onConnectTap}
              className={styles.button}
            >
              <div>{i18n.callToActionText}</div>
            </Button>
          </div>
        </Modal.Body>
      </Modal.Header>
    </Modal.Root>
  )
}

export default LinkAccount
