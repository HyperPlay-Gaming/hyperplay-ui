import React from 'react'

import CircularButton from '.'
import { ArrowLeft } from '../../assets/images'

export default {
  title: 'CircularButton',
  component: CircularButton
}

export const Default = () => (
  <CircularButton>
    <ArrowLeft />
  </CircularButton>
)
