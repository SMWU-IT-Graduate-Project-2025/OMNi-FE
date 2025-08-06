// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import OMNiApp from './App'
import './index.css' // Tailwind import 포함

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OMNiApp />
  </React.StrictMode>,
)