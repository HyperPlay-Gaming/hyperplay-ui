import React from 'react'

import AlertCard from '@/components/AlertCard'
import Button from '@/components/Button'

import ModalAnimation from '.'

export default {
  title: 'Modal/ModalAnimation',
  component: ModalAnimation
}

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalAnimation isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AlertCard
          variant="warning"
          title="How to report a problem?"
          message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
          onClose={() => setIsOpen(false)}
          style={{ maxWidth: 300 }}
        />
      </ModalAnimation>
    </>
  )
}
