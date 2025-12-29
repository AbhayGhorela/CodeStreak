import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';

// Main App Component
function App() {
  return (
    <AppProvider>
        <Dashboard />
    </AppProvider>
  );
}

export default App;
