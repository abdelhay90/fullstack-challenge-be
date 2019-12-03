import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

function SecureRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            if (!auth.isAuthenticated()) return <Redirect path='/' />;

            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}
export default SecureRoute;
