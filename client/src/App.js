/**
 * app component used as starting point to all app components
 */
import React from 'react';
import { inject } from 'mobx-react';
import { Route } from 'react-router-dom';
import { Home, Nav, Login } from './components';
import { Auth, AuthContext } from './Auth';
import WithRoot from './WithRoot';
import CustomersContainer from './components/customers/CustomersContainer';

const App = ({ history, store }) => {
  const auth = new Auth(history, store.network);
  return (
    <>
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className='body'>
          <Route
            path='/'
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path='/login'
            render={props => <Login auth={auth} {...props} />}
          />
          <Route
            path='/customers'
            render={props => <CustomersContainer auth={auth} {...props} />}
          />
        </div>
      </AuthContext.Provider>
    </>
  );
};

export default inject('store')(WithRoot(App));
