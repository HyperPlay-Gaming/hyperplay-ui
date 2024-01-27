import { IconAlertCircle, IconCheck } from '@tabler/icons-react'

import Loading from '../Loading'
import TextInput, { TextInputProps } from '../TextInput'

export interface AsyncTextInputProps extends TextInputProps {
  loading?: boolean
  valid?: boolean
}

export default function AsyncTextInput(props: AsyncTextInputProps) {
  const { loading, valid, ...rest } = props

  let status = null
  if (loading) {
    status = <Loading style={{ height: 24 }} />
  } else if (valid) {
    status = <IconCheck color="var(--color-success-600)" />
  } else if (props.error) {
    status = <IconAlertCircle color="var(--color-error-500)" />
  }

  return <TextInput {...rest} rightSection={status} />
}
