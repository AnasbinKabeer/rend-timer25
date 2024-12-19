
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the theme file

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
)
