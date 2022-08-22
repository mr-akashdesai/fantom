import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router-dom'
import App from '../App'
import '../sass/main.scss'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <Router>
    <App />
  </Router>
)
console.log('👋 Hello')
