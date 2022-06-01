import React from 'react'
import { Alert } from 'react-bootstrap'

export const Message = ({
  text,
  variant="info"
}) => {
  return (
    <Alert variant={variant}>
      {text}
    </Alert>
  )
}
