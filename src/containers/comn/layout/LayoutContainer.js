import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '_nav';
// routes config
import routes from 'routes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/comn/login';
import * as baseActions from 'store/comn/base';
import BaseContainer from 'containers/comn/base/BaseContainer';

const AsideContainer = React.lazy(() => import('./AsideContainer'));
const FooterContainer = React.lazy(() => import('./FooterContainer'));
const HeaderContainer = React.lazy(() => import('./HeaderContainer'));

class LayoutContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: false,
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.history.push('/login');
  }

  signIn = async () => {
    const login = process.env.REACT_APP_LOGIN;

    console.log(`check login: ${login}`);

    if (login === 'true') {
      const { LoginActions, logged } = this.props;

      if (localStorage.logged === 'true') {
        LoginActions.tempLogin();
      }

      try {
        await LoginActions.checkLogin();
      } catch (e) {
        console.error(e);
      }

      console.log(`is login: ${logged}`);

      if (!logged) {
        this.signOut();
      }
    }
  };

  getMenu = async () => {
    const { BaseActions } = this.props;

    try {
      await BaseActions.getMenu();
    } catch (e) {
      console.log(e);
    }

    const { menu } = this.props;

    console.log('menu:', menu);
  };

  componentWillMount() {
    console.log('componentWillMount...');
    console.table(process.env);
    this.signIn();
    this.getMenu();
  }

  componentDidMount() {
    console.log('componentDidMount...');
    setTimeout(() => {
      this.setState({ render: true });
    }, 1000);
  }

  onOpenConfirmModal() {
    console.log('onOpenConfirmModal');
  }

  render() {
    if (this.state.render) {
      const { menu } = this.props;

      return (
        <div className="app">
          <Helmet>
            <meta charsSet="utf-8" />
            <title>의료 정보 중개 플랫폼</title>
          </Helmet>
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <HeaderContainer onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
                <AppSidebarNav navConfig={menu} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          onOpenConfirmModal={this.onOpenConfirModal}
                          render={props => <route.component {...props} />}
                        />
                      ) : null;
                    })}
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <AsideContainer />
              </Suspense>
            </AppAside>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <FooterContainer />
            </Suspense>
          </AppFooter>
          <BaseContainer />
        </div>
      );
    }

    return this.loading();
  }
}

export default connect(
  state => ({
    logged: state.login.get('logged'),
    menu: state.base.get('menu'),
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(LayoutContainer);
