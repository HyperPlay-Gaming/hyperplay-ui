import { PlatformContainer } from '../PlatformContainer'
import TextInput, { TextInputProps } from '../TextInput'
import styles from './WebPlatformInput.module.scss'

export interface WebPlatformInputProps {
  textInputProps?: TextInputProps
}

export function WebPlatformInput({
  textInputProps
}: WebPlatformInputProps): React.JSX.Element {
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
