import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Authentication } from 'container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Authentication>
        <App />
      </Authentication>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
