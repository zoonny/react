import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'App.scss';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const PageLayout = Loadable({
  loader: () => import('containers/comn/layout'),
  loading,
});

const PageLogin = Loadable({
  loader: () => import('containers/comn/login/LoginContainer'),
  loading,
});

const Page404 = Loadable({
  loader: () => import('views/comn/page404/Page404'),
  loading,
});

const Page500 = Loadable({
  loader: () => import('views/comn/page500/Page500'),
  loading,
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" name="Page Login" component={PageLogin} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Page Main" component={PageLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
