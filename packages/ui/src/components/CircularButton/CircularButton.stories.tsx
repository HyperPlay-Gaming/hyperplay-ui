import React from 'react'
import { ArrowLeft } from '../../assets/images'
import CircularButton from '.'

export default {
  title: 'CircularButton',
  component: CircularButton
}

export const Default = () => (
  <CircularButton>
    <ArrowLeft />
  </CircularButton>
)
