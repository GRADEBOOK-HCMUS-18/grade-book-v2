import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MemoUser } from 'shared/components';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MemoUser>
        <App />
      </MemoUser>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
