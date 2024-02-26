import { AlertTriangle } from '@/assets/images'
import Button from '@/components/Button'
import { Modal, ModalProps } from '@/components/Modal'
import styles from '@/components/RemoveWalletModal/RemoveWalletModal.module.scss'
import TextInput from '@/components/TextInput'

interface Props extends ModalProps {
  onSubmit: () => string
  i18n?: {
    title: string
    body: string
    inputLabel: string
    submitButtonLabel: string
    cancelButtonLabel: string
  }
}

export default function UpdatesSubscriptionModal({
  i18n = {
    title: 'Get notified on our latest updates',
    body: 'Get notified about our upcoming events, Quests, features and more!',
    inputLabel: 'Email',
    submitButtonLabel: 'Let’s do it!',
    cancelButtonLabel: 'No, another time'
  },
  ...props
}: Props) {
  return (
    <Modal {...props} withCloseButton>
      <Modal.HeadingIcon className={styles.iconContainer}>
        <AlertTriangle className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n?.title}</Modal.Title>
        <Modal.Body className="body-sm">{i18n?.body}</Modal.Body>
      </Modal.Header>
      <form className={styles.form} onSubmit={props.onSubmit}>
        <TextInput label={i18n?.inputLabel} type="email" />
        <div className={styles.footer}>
          <Button type="tertiary" htmlType="button">
            {i18n?.cancelButtonLabel}
          </Button>
          <Button type="danger" htmlType="submit">
            {i18n?.submitButtonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
