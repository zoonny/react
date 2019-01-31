import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import { withRouter } from 'react-router-dom';

import { Alert } from 'reactstrap';

class AlertContainer extends Component {
  render() {
    const { visible, message } = this.props;

    return visible && <Alert color="primary">{message}</Alert>;
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(['alert', 'warning']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(withRouter(AlertContainer));
