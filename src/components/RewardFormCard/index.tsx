import cn from 'classnames'

import {
  ContainerInteractive,
  ContainerInteractiveProps
} from '@/components/ContainerInteractive'
import Select, { SelectProps } from '@/components/Select'
import {
  SelectCreatable,
  SelectCreatableProps
} from '@/components/SelectCreatable'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './RewardFormCard.module.scss'

export interface RewardFormCardProps extends ContainerInteractiveProps {
  networkInputProps?: SelectCreatableProps
  tokenContractAddressInputProps?: TextInputProps
  tokenTypeInputProps?: SelectProps
}

function RewardFormCard({ classNames, ...props }: RewardFormCardProps) {
  return (
    <ContainerInteractive
      classNames={{
        ...classNames,
        title: cn(styles.title, classNames?.title),
        root: cn(styles.root, classNames?.root)
      }}
      {...props}
    >
      <SelectCreatable {...props.networkInputProps} />
      <TextInput {...props.tokenContractAddressInputProps} />
      <Select {...props.tokenTypeInputProps} />
      {props.children}
    </ContainerInteractive>
  )
}

export default RewardFormCard
