import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClient, QueryClientProvider  } from 'react-query';
import { ContextStateProvider } from './hooks/Context';
import { AuthContextStateProvider } from './hooks/authContext';





const queryCleint = new QueryClient();



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <QueryClientProvider  client={queryCleint}>
        <AuthContextStateProvider>
          <ContextStateProvider>
            <App />
          </ContextStateProvider>
        </AuthContextStateProvider>
      </QueryClientProvider>
)
