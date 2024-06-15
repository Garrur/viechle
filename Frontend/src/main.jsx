import React from 'react';
import ReactDOM from 'react-dom/client'; // Using react-dom/client as requested
import App from './App.jsx'; // Assuming App component is in App.jsx
import './index.css';
import { Provider } from 'react-redux';
import store from './store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
