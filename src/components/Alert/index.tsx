import React, { HTMLProps } from 'react';

import cs from 'classnames';
import styles from './index.module.scss'

type Variants = 'warning' | 'danger' | 'info' | 'success'

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  variant?: Variants,
  message: string
}

const Alert = ({ variant = 'info', message, ...props }: AlertProps) => {
  return (
    <div className={cs(styles.base, styles[variant])} {...props}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
