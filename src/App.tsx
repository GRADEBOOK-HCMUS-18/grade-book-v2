import { useState } from 'react';
import { SideBar, NavBar } from 'layout';
import { HomePage, LoginPage } from 'pages';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute } from 'router';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      {location.pathname !== '/' && (
        <>
          <NavBar toggleSideBar={toggleSideBar} />
          <SideBar show={showSidebar} toggle={toggleSideBar} />
        </>
      )}

      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <div className="App">
          <PrivateRoute path="/class">
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/setting">
            <div>Setting</div>
          </PrivateRoute>
          <PrivateRoute path="/archived">
            <div>Lưu trữ</div>
          </PrivateRoute>
          <PrivateRoute path="/calendar">
            <div>Lịch</div>
          </PrivateRoute>
          <Route>
            <Redirect to="/class" />
          </Route>
        </div>
      </Switch>
    </>
  );
}

export default App;
