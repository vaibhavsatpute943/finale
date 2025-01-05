import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log the performance metrics to the console
reportWebVitals(console.log);

// Alternatively, you can send the metrics to an analytics server
// reportWebVitals((metric) => {
//   fetch('/analytics', {
//     method: 'POST',
//     body: JSON.stringify(metric),
//     headers: { 'Content-Type': 'application/json' },
//   });
// });
