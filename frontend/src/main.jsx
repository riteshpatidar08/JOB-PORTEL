import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store.js';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
