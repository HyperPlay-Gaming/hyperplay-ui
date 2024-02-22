'use client'

import { useForm } from '@mantine/form'

import { AlertTriangle } from '@/assets/images'
import Button from '@/components/Button'
import { Modal } from '@/components/Modal'
import { ModalProps } from '@/components/Modal/Modal'
import TextInput from '@/components/TextInput'

import styles from './RemoveWalletModal.module.scss'

interface Props extends ModalProps {
  onConfirmed: () => void
  i18n?: {
    title?: string
    body?: string
    confirmButtonLabel?: string
    cancelButtonLabel?: string
    inputLabel?: string
    confirmationText?: string
    errorLabel?: string
  }
}

export default function RemoveWalletModal({
  onConfirmed,
  i18n = {
    title: 'Remove this wallet?',
    body: 'This option is risky! Please ensure you backup your secret recovery phrase. If you don’t, you will lose access to your wallet. Are you sure you want to remove this wallet?',
    confirmButtonLabel: 'Remove',
    cancelButtonLabel: 'Cancel',
    inputLabel: 'Type REMOVE to confirm',
    confirmationText: 'REMOVE',
    errorLabel: 'Sorry, please enter the text exactly as displayed to confirm.'
  },
  ...props
}: Props) {
  const form = useForm({
    initialValues: {
      confirmationText: ''
    },
    validate: {
      confirmationText: (value) =>
        value === i18n.confirmationText ? null : i18n.errorLabel
    }
  })
  return (
    <Modal
      withCloseButton
      classNames={{
        root: styles.root
      }}
      {...props}
    >
      <Modal.HeadingIcon className={styles.iconContainer}>
        <AlertTriangle className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n?.title}</Modal.Title>
        <Modal.Body className="body-sm">{i18n?.body}</Modal.Body>
      </Modal.Header>
      <form
        className={styles.form}
        onSubmit={form.onSubmit(() => {
          if (form.isValid()) {
            onConfirmed()
          }
        })}
      >
        <TextInput
          error={form.errors.confirmationText}
          label={i18n?.inputLabel}
          {...form.getInputProps('confirmationText')}
        />
        <div className={styles.footer}>
          <Button type="tertiary" htmlType="button">
            {i18n?.cancelButtonLabel}
          </Button>
          <Button type="danger" htmlType="submit">
            {i18n?.confirmButtonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
