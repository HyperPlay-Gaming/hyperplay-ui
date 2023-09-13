import React from 'react'

import { Trophy } from '@/assets/images'
import Button from '@/components/Button'

import ModalSuccess from '.'

export default {
  title: 'Modal/ModalSuccess',
  component: ModalSuccess
}

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Mint NFT!</Button>
      <ModalSuccess
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Grats!"
        callToActionText="Back to achievements"
        callToActionLink="https://www.hyperplay.xyz/"
        icon={<Trophy />}
      >
        <h6>
          <strong>137 </strong>
          Achievements Minted
        </h6>
      </ModalSuccess>
    </>
  )
}
