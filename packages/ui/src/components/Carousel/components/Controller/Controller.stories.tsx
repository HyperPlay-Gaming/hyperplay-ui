import React from 'react'
import Controller from '.'

export default {
  title: 'Carousel/Components/Controller',
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
    interval={3000}
    onChange={console.log}
  ></Controller>
)
