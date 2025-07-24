import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Debug logging
console.log('🚀 Starting Cyberpunk Portfolio...');
console.log('User Agent:', navigator.userAgent);

// Hide loading screen when React starts
const hideLoading = () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
    console.log('✅ Loading screen hidden');
  }
};

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, creating React app...');

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  
  console.log('✅ React app rendered successfully');
  
  // Hide loading screen after render
  setTimeout(hideLoading, 100);
} catch (error) {
  console.error('❌ Error rendering React app:', error);
  hideLoading();
}
