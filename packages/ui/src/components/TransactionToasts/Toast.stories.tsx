import React from 'react'
import TransactionToast from '.'

export default {
  title: 'TransactionToasts'
}

export const Pending = () => {
  return (
    <TransactionToast
      status="pending"
      title="Transaction request pending"
      subtext="A wallet confirmation is pending on your mobile wallet."
      onClick={() => console.log('pending clicked!')}
      showCloseButton={true}
    />
  )
}

export const Submitted = () => {
  return (
    <TransactionToast
      status="submitted"
      title="Transaction submitted"
      subtext="We are waiting confirmation from the blockchain. We will let you know when it’s confirmed."
      onClick={() => console.log('submitted clicked!')}
    />
  )
}

export const Error = () => {
  return (
    <TransactionToast
      status="error"
      title="Transaction interrupted"
      subtext="Transaction was canceled or not submitted, please try again."
      onClick={() => console.log('error clicked!')}
      showCloseButton={true}
    />
  )
}

export const Alert = () => {
  return (
    <TransactionToast
      status="alert"
      title="Reconnecting..."
      subtext="Re-open MetaMask Mobile to re-establish connection."
      onClick={() => console.log('alert clicked!')}
    />
  )
}

export const Success = () => {
  return (
    <TransactionToast
      status="success"
      title="Transaction confirmed"
      subtext="The transaction was successfully confirmed!"
      onClick={() => console.log('success clicked!')}
      showCloseButton={true}
    />
  )
}
