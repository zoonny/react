import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/comn/login';
import * as baseActions from 'store/comn/base';

import ConfirmModalContainer from 'containers/comn/modal/ConfirmModalContainer';
import AlertContainer from 'containers/comn/alert/AlertContainer';

class BaseContainer extends Component {
  initialize = async () => {
    const { LoginActions } = this.props;
    if (localStorage.logged === 'true') {
      LoginActions.tempLogin();
    }
    LoginActions.checkLogin();
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <div>
        <ConfirmModalContainer />
        <AlertContainer />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(BaseContainer);
