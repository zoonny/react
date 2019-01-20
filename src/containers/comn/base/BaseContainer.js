import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';

import ConfirmModalContainer from 'containers/comn/modal/ConfirmModalContainer';
import AlertContainer from 'containers/comn/alert/AlertContainer';

class BaseContainer extends Component {
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
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(BaseContainer);
