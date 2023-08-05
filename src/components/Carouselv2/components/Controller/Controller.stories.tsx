import React from 'react'

import Controller from '.'

export default {
  title: 'Carousel/Components/Controllerv2',
  component: Controller
}

const images = [
  <img src="https://picsum.photos/60/100" key="1" />,
  <img src="https://picsum.photos/60/100" key="2" />,
  <img src="https://picsum.photos/60/100" key="3" />,
  <img src="https://picsum.photos/60/100" key="4" />
]

export const Primary = () => (
  <Controller
    images={images}
    onChange={console.log}
    activeIndex={0}
  ></Controller>
)
