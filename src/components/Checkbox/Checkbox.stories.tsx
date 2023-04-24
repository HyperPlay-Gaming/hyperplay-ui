import React, { useRef } from 'react'

import Checkbox from '.'

export default {
  title: 'Checkbox',
  component: Checkbox
}

export const SemiRoundedCheckboxPrimary = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const SemiRoundedCheckboxPrimaryDisabled = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      disabled
      defaultChecked={true}
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const SemiRoundedCheckboxSecondary = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      defaultChecked={true}
      type="secondary"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const SemiRoundedCheckboxSecondaryDisabled = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      disabled
      defaultChecked={true}
      type="secondary"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}
export const SemiRoundedCheckboxIcon = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      defaultChecked={true}
      type="icon"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const SemiRoundedCheckboxIconDisabled = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      disabled
      defaultChecked={true}
      type="icon"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxPrimary = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxPrimaryDisabled = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
      disabled
      defaultChecked
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxSecondary = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
      type="secondary"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxSecondaryDisabled = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
      type="secondary"
      disabled
      defaultChecked
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxIcon = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
      type="icon"
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}

export const RoundedCheckboxSecondaryIcon = () => {
  const checkbox = useRef<HTMLInputElement>(null)

  return (
    <Checkbox
      ref={checkbox}
      onClick={() => console.log(checkbox.current?.checked)}
      shape="rounded"
      type="icon"
      disabled
      defaultChecked
    >
      <div className="body">Hello</div>
    </Checkbox>
  )
}
