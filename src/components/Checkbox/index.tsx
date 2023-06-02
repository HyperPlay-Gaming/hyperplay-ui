import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  forwardRef
} from 'react'

import { Checkmark } from '@/assets/images'

import CheckboxStyles from './Checkbox.module.scss'

export interface CheckboxProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  disabled?: boolean
  type?: 'primary' | 'secondary' | 'icon'
  shape?: 'rounded' | 'semiRounded'
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    children,
    disabled = false,
    type = 'primary',
    shape = 'semiRounded',
    ...props
  }: CheckboxProps,
  ref
) {
  return (
    <label className={CheckboxStyles.container}>
      {children}
      <input type="checkbox" ref={ref} {...props} disabled={disabled} />
      <span
        className={`${CheckboxStyles.checkmark} ${CheckboxStyles[type]} ${CheckboxStyles[shape]}`}
      >
        <Checkmark fill="var(--checkbox-checkmark-color)" />
      </span>
    </label>
  )
})

export default Checkbox
