import type { Meta, StoryObj } from '@storybook/react'
import { Image } from '@mantine/core'

import CustomImage, { CustomImageProps } from '.'

const props: CustomImageProps = {
  src: 'https://i.imgur.com/Cij5vdL.png',
  h: 200,
  w: 'auto',
}

const meta: Meta<typeof CustomImage> = {
  title: 'Image/CustomImage',
  component: CustomImage,
  args: props,
}

type Story =  StoryObj<typeof CustomImage>

export const Default: Story = {
  args: props
};

export const FallbackComponent: Story = {
  args: {
    ...props,
    placeholder: (<div><h2>This is a fallback image</h2><Image src="https://picsum.photos/60/100" /></div>)
  }
};

export const SimpleFallback: Story = {
  args: {
    ...props,
    fallbackSrc: 'https://picsum.photos/60/100'
  }
};

export default meta