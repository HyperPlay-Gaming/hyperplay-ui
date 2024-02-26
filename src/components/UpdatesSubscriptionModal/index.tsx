import { useForm } from '@mantine/form'

import { AlertBell } from '@/assets/images'
import Button from '@/components/Button'
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

export interface UpdatesSubscriptionModalProps extends ModalProps {
  onSubmitClick: () => void
  onCancelClick?: () => void
  i18n?: UpdatesSubscriptionModalI18nProp
}

export default function UpdatesSubscriptionModal({
  i18n = defaultI18n,
  ...props
}: UpdatesSubscriptionModalProps) {
  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : i18n.invalidEmailError
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
        <AlertBell className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n?.title}</Modal.Title>
        <Modal.Body className="body-sm">{i18n?.body}</Modal.Body>
      </Modal.Header>
      <form
        className={styles.form}
        onSubmit={form.onSubmit(() => {
          if (form.isValid()) {
            props.onSubmitClick()
          }
        })}
      >
        <TextInput
          label={i18n?.inputLabel}
          placeholder={i18n?.inputPlaceholder}
          {...form.getInputProps('email')}
        />
        <div className={styles.footer}>
          <Button type="secondary" htmlType="submit" className={styles.submit}>
            {i18n?.submitButtonLabel}
          </Button>
          <Button type="link" htmlType="button" onClick={props.onCancelClick}>
            {i18n?.cancelButtonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
