import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import type { Router as RemixRouter } from '@remix-run/router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loginRoutes } from './modules/login/routes/loginRoutes';
import { homeScreens } from './modules/home/routes/homeRoutes';
import { GlobalProvider } from './modules/shared/hooks/useGlobalContext';
import GlobalStyle from './global.style';

const router: RemixRouter = createBrowserRouter([...homeScreens, ...loginRoutes]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <GlobalProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
