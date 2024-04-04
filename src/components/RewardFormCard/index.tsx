import cn from 'classnames'

import {
  ContainerInteractive,
  ContainerInteractiveProps
} from '@/components/ContainerInteractive'
import RewardImage from '@/components/RewardImage'
import Select, { SelectProps } from '@/components/Select'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './RewardFormCard.module.scss'

export interface RewardFormCardProps extends ContainerInteractiveProps {
  networkInputProps?: SelectProps
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
      <Select {...props.networkInputProps} />
      <div className={styles.split}>
        <div>
          <RewardImage label="Reward Image" />
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
    </ContainerInteractive>
  )
}

export default RewardFormCard
