import React from 'react'

import TextInput from './index'

export default {
  title: 'forms/TextInput',
  component: TextInput
}

export const Default = () => <TextInput placeholder="Email" />

export const WithLabel = () => (
  <TextInput id="with-label" placeholder="Enter your email" label="Email" />
)