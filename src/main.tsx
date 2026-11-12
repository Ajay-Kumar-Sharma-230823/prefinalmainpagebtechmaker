import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './refinements.css'
import './journey.css'
import './polish.css'
import './updates.css'
import './theme-fix.css'
import './responsive.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
