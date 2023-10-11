import React from 'react'

import Button from '@/components/Button'

import Modal from './index'

export default {
  title: 'Modal/Base',
  component: Modal
}

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        withCloseButton={true}
      >
        <Modal.Header>
          <Modal.Title>This is the tile</Modal.Title>
          <Modal.Body>This is the body</Modal.Body>
        </Modal.Header>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </Modal>
    </>
  )
}
