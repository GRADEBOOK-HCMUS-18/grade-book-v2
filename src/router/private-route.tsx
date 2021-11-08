import { Route, Redirect, RouteProps } from 'react-router-dom';
import { userViewModel } from 'shared/view-models';

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
        userViewModel.isLogin() ? (
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
