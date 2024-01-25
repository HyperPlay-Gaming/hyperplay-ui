import type { Meta, StoryObj } from '@storybook/react'

import Gallery, { GalleryProps } from '.'

const meta: Meta<typeof Gallery> = {
  title: 'DevPortal/Gallery',
  component: Gallery
}

export default meta

type Story = StoryObj<typeof Gallery>

const props: GalleryProps = {
  assets: [
    {
      name: 'galaktic_guy_331.png',
      type: 'image/png',
      src: 'https://gateway.valist.io/ipfs/QmVhP5jLHtHK1NybQ4b7yW5tNWb5foH3eUWLikpCnkvGgz'
    },
    {
      name: 'hemp_of_the_vivarium.png',
      type: 'image/png',
      src: 'https://gateway.valist.io/ipfs/QmajKPKsKLAfcm5rLuEofhuBDydxukredUriaDqcau5xoS'
    },
    {
      name: 'jiyuu-jin.png',
      type: 'image/png',
      src: 'https://gateway.valist.io/ipfs/QmR1Skw36bMJ3x62ajpNKbEQj6CBf8MpTfHuNiVFWeh6yS'
    },
    {
      name: 'Tropaeolin_Of_The_Tower.png',
      type: 'image/png',
      src: 'https://gateway.valist.io/ipfs/QmUtgUCti7gdzWCuJG6FMUDKmAGbumwathX7qgSFWA8NzB'
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}
