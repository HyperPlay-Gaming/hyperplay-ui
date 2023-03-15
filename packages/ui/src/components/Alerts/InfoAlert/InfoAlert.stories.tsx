/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import InfoAlert from '.'

export default {
  title: 'Alerts/InfoAlert',
  component: InfoAlert
}

export const Default = () => (
  <InfoAlert
    title="How to report a problem?"
    message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
    actionText="Button CTA"
    onClose={() => {}}
    onActionClick={() => {}}
  />
)
