import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal/Modal'
import { TextInput } from '@/index'

import Alert from '../Alert'
import styles from './Login.module.scss'

interface I18n {
  title: string
  subtitle: string
  inputPlaceholder: string
  submitButton: string
}

export interface SignInModalProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onSubmit'> {
  loading?: boolean
  error?: string
  onClose: () => void
  onSubmit: (email: string) => void
  i18n?: I18n
}

const Login = ({
  loading,
  error,
  className,
  onClose,
  onSubmit,
  i18n = {
    title: 'Login to HyperPlay',
    subtitle: 'Use your email to create and access your HyperPlay profile.',
    inputPlaceholder: 'Enter your email',
    submitButton: 'Login'
  },
  ...props
}: SignInModalProps) => {
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
      <>
        <Modal.HeadingIcon className={styles.emailRoundedIcon}>
          <Email className={styles.icon} width={20} height={20} />
        </Modal.HeadingIcon>
        <Modal.Header>
          <Modal.Title>{i18n?.title}</Modal.Title>
          <Modal.Body>{i18n?.subtitle}</Modal.Body>
        </Modal.Header>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <Alert variant="warning" message={error} />}
          <TextInput
            required
            classNames={{ input: styles.emailInput, label: styles.label }}
            placeholder={i18n?.inputPlaceholder}
            label="Email"
            name="email"
            type="email"
            width="100%"
          />
          <div className={styles.buttonContainer}>
            <Button
              disabled={loading}
              aria-label={loading ? 'loading' : undefined}
              type={loading ? 'secondary' : 'primary'}
              htmlType="submit"
              size="medium"
              className={cn(loading && styles.loadingButton)}
            >
              {loading ? <Loading /> : i18n?.submitButton}
            </Button>
          </div>
        </form>
      </>
    </Modal.Root>
  )
}

export default Login
