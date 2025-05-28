import React from 'react'

function RoyCustomPanel() {
  return (
    <div style={{ padding: '20px', color: '#333' }}>
    <h3 style={{ color: 'purple' }}>Custom Extension Panel</h3>
    <p>This panel is added by your custom extension</p>
    <button 
      style={{ 
        padding: '8px 16px',
        background: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
      onClick={() => alert('Extension button clicked!')}
    >
      Click Me
    </button>
  </div>
  )
}

export default RoyCustomPanel