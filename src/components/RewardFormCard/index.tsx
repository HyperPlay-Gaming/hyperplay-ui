import { ReactNode } from 'react'

import cn from 'classnames'

import {
  ContainerInteractive,
  ContainerInteractiveProps
} from '@/components/ContainerInteractive'
import RewardImageInput, {
  RewardImageInputProps
} from '@/components/RewardImageInput'
import Select, { SelectProps } from '@/components/Select'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './RewardFormCard.module.scss'

export interface RewardFormCardProps extends ContainerInteractiveProps {
  networkInputProps?: SelectProps
  tokenContractAddressInputProps?: TextInputProps
  tokenTypeInputProps?: SelectProps
  rewardImageProps?: RewardImageInputProps
  RewardContract?: ReactNode
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
      {props.RewardContract}
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
    </ContainerInteractive>
  )
}

export default RewardFormCard
