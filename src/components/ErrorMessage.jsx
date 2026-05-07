import { useState } from 'react'

function ErrorMessage({ message, onDismiss }) {
  const [visible, setVisible] = useState(true)

  const handleDismiss = () => {
    setVisible(false)
    if (onDismiss) onDismiss()
  }

  if (!visible || !message) return null

  return (
    <div className="error-message">
      <span>{message}</span>
      <button onClick={handleDismiss}>×</button>
    </div>
  )
}

export default ErrorMessage
