import PlatformContainer from '../PlatformContainer'
import TextInput, { TextInputProps } from '../TextInput'
import styles from './WebPlatformInput.module.scss'

export interface WebPlatformInputProps {
  textInputProps?: TextInputProps
}

export default function WebPlatformInput({
  textInputProps
}: WebPlatformInputProps): JSX.Element {
  return (
    <PlatformContainer platformName="web">
      <TextInput
        label="Build URL"
        placeholder="https://"
        classNames={{ root: styles.root }}
        {...textInputProps}
      />
    </PlatformContainer>
  )
}
