
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TimerProvider } from './components/Context/TimerContext';




createRoot(document.getElementById('root')).render(

  <TimerProvider>
    <App />
    </TimerProvider>
 
)
