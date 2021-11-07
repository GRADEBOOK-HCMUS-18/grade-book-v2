import { Route, Redirect, RouteProps } from 'react-router-dom';

const isLogin = false;

interface PrivateRouteProps extends RouteProps {
  component?: any;

  children?: any;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLogin ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
