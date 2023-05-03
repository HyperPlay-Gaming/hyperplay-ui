import React from 'react'

import Toggle from '.'

export default {
  title: 'Toggle',
  component: Toggle
}

export const Default = () => {
  return (
    <Toggle onChange={(e) => console.log('toggle changed', e.target.checked)}>
      <h6>Downloaded</h6>
    </Toggle>
  )
}

export const DisabledLeft = () => {
  return (
    <Toggle disabled={true} labelPosition="left">
      <div className="body">Downloaded</div>
    </Toggle>
  )
}

export const DisabledRight = () => {
  return (
    <Toggle disabled={true} labelPosition="right">
      <div className="body">Downloaded</div>
    </Toggle>
  )
}

export const DisabledChecked = () => {
  return (
    <Toggle disabled={true} defaultChecked={true} labelPosition="right">
      <div className="body">Downloaded</div>
    </Toggle>
  )
}
