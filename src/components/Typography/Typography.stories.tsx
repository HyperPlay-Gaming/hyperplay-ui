import React from 'react'

import * as Typography from '.'

export default {
  title: 'Typography'
}

export const Primary = () => {
  const elements = []
  for (const key in Typography) {
    // Not worth it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Element = Typography[key]
    elements.push(<Element key={key}>{key}</Element>)
  }
  return <>{elements}</>
}
