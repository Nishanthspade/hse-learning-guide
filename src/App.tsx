/**
 * HSE Learning Guide - Main Application Component
 * Sets up routing, providers, and global layout
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes';
import { Toaster } from './components/ui/Toaster';

// Global styles are imported in main.tsx

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AppRoutes />
        </div>
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;