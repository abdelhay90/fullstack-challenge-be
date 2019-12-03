import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import { Store } from './models';
import Network from './common/network';
import App from './App';
import * as serviceWorker from './serviceWorker';

const renderApp = store => {
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <Router>
          <Route component={App} />
        </Router>
      </Provider>
    </div>,
    document.getElementById('root'),
  );
};

const init = async () => {
  const network = new Network(null);
  const store = new Store({ token: network.getToken() });
  if (network.getToken()) {
    await store.getCustomers();
  }
  renderApp(store);
};

init();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
