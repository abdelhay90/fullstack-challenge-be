import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Nav, Login, Customers } from './components';
import { Auth, AuthContext } from './Auth';
import WithRoot from './WithRoot';

class App extends Component {
  constructor(props) {
    super(props);
    const { history } = props;
    this.state = {
      auth: new Auth(history),
    };
  }

  componentDidMount() {}

  render() {
    const { auth } = this.state;
    return (
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
            render={props => <Customers auth={auth} {...props} />}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default WithRoot(App);
