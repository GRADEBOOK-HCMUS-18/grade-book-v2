import { useState } from 'react';
import { SideBar, NavBar } from 'layout';
import { ClassDetail, HomePage, AuthenticationPage } from 'pages';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute } from 'router';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  const isInLoginPage =
    location.pathname !== '/' && location.pathname !== '/register';

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      {isInLoginPage && (
        <>
          <NavBar toggleSideBar={toggleSideBar} />
          <SideBar show={showSidebar} toggle={toggleSideBar} />
        </>
      )}

      <Switch>
        <Route exact path="/">
          <AuthenticationPage isLogin={true} />
        </Route>
        <Route path="/register">
          <AuthenticationPage isLogin={false} />
        </Route>
        <Route path="/class/:id">
          <ClassDetail />
        </Route>
        <PrivateRoute path="/class">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/setting">
          <div className="container">Setting</div>
        </PrivateRoute>
        <PrivateRoute path="/archived">
          <div className="container">Lưu trữ</div>
        </PrivateRoute>
        <PrivateRoute path="/calendar">
          <div className="container">Lịch</div>
        </PrivateRoute>

        <Route>
          <Redirect to="/class" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
