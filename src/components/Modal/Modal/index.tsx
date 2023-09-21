import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLProps
} from 'react'

import cn from 'classnames'

import { CloseModalIcon } from '@/assets/images'

import ModalAnimation, { ModalAnimationProps } from '../ModalAnimation'
import styles from './Modal.module.scss'

const Header = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return <div className={cn(className, styles.header)} {...props}></div>
}

const Body = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => {
  return <p className={cn('body', styles.subtitle, className)} {...props}></p>
}

const HeadingIcon = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return <div className={cn(className, styles.headingIcon)} {...props}></div>
}

const Title = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => {
  return <h6 className={cn(className, styles.title)} {...props}></h6>
}

const CloseButton = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button className={styles.close} {...props}>
      <CloseModalIcon />
    </button>
  )
}

const Content = ({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn(className, styles.root)} {...props}>
      {children}
    </div>
  )
}

export interface ModalProps extends ModalAnimationProps {
  withCloseButton?: boolean
}

const Modal = (props: ModalProps) => {
  return (
    <ModalAnimation {...props}>
      {props.withCloseButton && <CloseButton onClick={props.onClose} />}
      {props.children}
    </ModalAnimation>
  )
}

Modal.Content = Content
Modal.Body = Body
Modal.Title = Title
Modal.CloseButton = CloseButton
Modal.Header = Header
Modal.HeadingIcon = HeadingIcon

export default Modal
