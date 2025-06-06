import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { AlertBell } from '@/assets/images'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Loading from '@/components/Loading'
import { Modal, ModalProps } from '@/components/Modal'
import TextInput from '@/components/TextInput'

import styles from './UpdatesSubscriptionModal.module.scss'

interface UpdatesSubscriptionModalI18nProp {
  title: string
  body: string
  inputLabel: string
  inputPlaceholder: string
  submitButtonLabel: string
  cancelButtonLabel: string
  invalidEmailError: string
}

export const defaultI18n: UpdatesSubscriptionModalI18nProp = {
  title: 'Get notified on our latest updates',
  body: 'Get notified about our upcoming events, Quests, features and more!',
  inputLabel: 'Email',
  inputPlaceholder: 'Enter your email',
  submitButtonLabel: 'Let’s do it!',
  cancelButtonLabel: 'No, another time',
  invalidEmailError: 'Invalid Email'
}

export interface UpdatesSubscriptionModalProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onSubmit'>,
    Omit<ModalProps, 'onSubmit'> {
  error?: string
  loading?: boolean
  className?: string
  onSubmit: (email: string) => void
  onCancel: () => void
  onClose: () => void
  i18n?: UpdatesSubscriptionModalI18nProp
}

export default function UpdatesSubscriptionModal({
  loading,
  error,
  className,
  onClose,
  onSubmit,
  i18n = defaultI18n,
  ...props
}: UpdatesSubscriptionModalProps) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: { value: string }
    }
    onSubmit(formElements.email.value)
  }

  return (
    <Modal.Root {...props} className={cn(className, styles.root)}>
      <Modal.CloseButton aria-label="close signup modal" onClick={onClose} />
      <Modal.HeadingIcon className={styles.iconContainer}>
        <AlertBell className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title className="title">{i18n?.title}</Modal.Title>
        <Modal.Body className="body-sm">{i18n?.body}</Modal.Body>
      </Modal.Header>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <Alert variant="warning" message={error} />}
        <TextInput
          required
          disabled={loading}
          label={i18n?.inputLabel}
          placeholder={i18n?.inputPlaceholder}
          name="email"
          type="email"
        />
        <div className={styles.formActions}>
          <Button
            disabled={loading}
            aria-label={loading ? 'loading' : undefined}
            type={loading ? 'secondary' : 'primary'}
            htmlType="submit"
            className={cn(loading && styles.loadingButton)}
          >
            {loading ? <Loading /> : i18n?.submitButtonLabel}
          </Button>
          <Button type="secondary" htmlType="button" onClick={props.onCancel}>
            {i18n?.cancelButtonLabel}
          </Button>
        </div>
      </form>
    </Modal.Root>
  )
}
