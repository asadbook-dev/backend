import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position='top-center' />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
