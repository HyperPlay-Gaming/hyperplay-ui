import cn from 'classnames'

import RewardImageInput, {
  RewardImageInputProps
} from '@/components/RewardImageInput'
import Select, { SelectProps } from '@/components/Select'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './RewardCommonInputs.module.scss'

export interface RewardCommonInputsProps {
  networkInputProps?: SelectProps
  tokenContractAddressInputProps?: TextInputProps
  tokenTypeInputProps?: SelectProps
  rewardImageProps?: RewardImageInputProps
  children?: React.ReactNode
}

export function RewardCommonInputs(props: RewardCommonInputsProps) {
  return (
    <div className={styles.split}>
      <div>
        <RewardImageInput label="Reward Image" {...props.rewardImageProps} />
        <span className="text--sm color-neutral-400 text--semibold">
          Requirements:
        </span>
        <ul className={cn('color-neutral-400', styles.requirementList)}>
          <li>SVG, PNG, JPG</li>
          <li>1:1 Ratio</li>
          <li>Min: 48px</li>
        </ul>
      </div>
      <div className={styles.inputs}>
        <TextInput {...props.tokenContractAddressInputProps} />
        <Select {...props.tokenTypeInputProps} />
        {props.children}
      </div>
    </div>
  )
}

export default RewardCommonInputs
