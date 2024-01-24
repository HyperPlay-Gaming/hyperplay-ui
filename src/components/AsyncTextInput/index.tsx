import * as Icon from 'tabler-icons-react'

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
    status = <Icon.Check color="#669F2A" />
  } else if (props.error) {
    status = <Icon.AlertCircle color="#F04438" />
  }

  return <TextInput {...rest} rightSection={status} />
}
