import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContextShare from './context/SearchContextShare.jsx'
import ChatContextShare from './context/ChatContextShare.jsx'
import ThemeContext from './context/ThemeContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
//import SocketContext from './context/SocketContext.jsx'



createRoot(document.getElementById('root')).render(
 

    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
        <ThemeContext>

          <SocketProvider>
            <SearchContextShare>
              <ChatContextShare>
                <NotificationProvider>
                <App />
                </NotificationProvider>
              </ChatContextShare>
            </SearchContextShare>
          </SocketProvider>

        </ThemeContext>
      </GoogleOAuthProvider>
    </BrowserRouter>



)
