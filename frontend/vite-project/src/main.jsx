import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from '@/components/ui/provider'
import {ChatProvider} from './components/ApiContext/ChatProvider.jsx'

createRoot(document.getElementById('root')).render(
  
    <Provider>
    <BrowserRouter>
    <ChatProvider >
        
          <App />
        
    </ChatProvider>
    </BrowserRouter>
    </Provider>
  ,
)
