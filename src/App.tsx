import { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { SideBar, NavBar } from 'layout';
import {
  ClassDetail,
  HomePage,
  AuthenticationPage,
  ProfilePage,
  ResetPasswordPage,
} from 'pages';
import { PrivateRoute } from 'router';
import 'shared/styles/common.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  const isInAuthenPage =
    location.pathname !== '/login' &&
    location.pathname !== '/register' &&
    location.pathname !== '/reset';

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {isInAuthenPage && (
        <>
          <NavBar toggleSideBar={toggleSideBar} />
          <SideBar show={showSidebar} toggle={toggleSideBar} />
        </>
      )}
      <Switch>
        <PrivateRoute exact path="/">
          <HomePage />
        </PrivateRoute>
        <Route path="/login">
          <AuthenticationPage isLogin={true} />
        </Route>
        <Route path="/register">
          <AuthenticationPage isLogin={false} />
        </Route>
        <Route path="/reset">
          <ResetPasswordPage />
        </Route>
        <PrivateRoute path="/class/:id">
          <ClassDetail />
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
        <PrivateRoute path="/profile">
          <ProfilePage />
        </PrivateRoute>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
