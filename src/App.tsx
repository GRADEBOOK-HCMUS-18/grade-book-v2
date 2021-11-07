import { HomePage } from 'pages';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { PrivateRoute } from 'router/private-route';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Route exact path="/test" component={() => <div>Test</div>} />
        <PrivateRoute exact path="/ok" component={() => <div>OK</div>} />
        <HomePage />
      </header>
    </div>
  );
}

export default App;
