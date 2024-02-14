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

export const WithCharacterLimit = () => <TextInput maxCharacters={10} />

export const Error = () => (
  <TextInput
    id="with-label"
    placeholder="Enter your email"
    label="Email"
    error="Invalid email"
  />
)

export const SmallSize = () => <TextInput size="small" placeholder="Enter your email" />

export const MediumSize = () => <TextInput size="medium" placeholder="Enter your email" />

export const LargeSize = () => <TextInput size="large" placeholder="Enter your email" />
