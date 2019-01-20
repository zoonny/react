import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';

import ModalAlertExample from 'views/example/modal/ModalAlertExample';

class ModalAlertExampleContainer extends Component {
  handleOpenModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('confirm');
  };

  handleOpenAlert = () => {
    const { BaseActions } = this.props;
    BaseActions.showAlert('warning');
  };

  render() {
    const { handleOpenModal, handleOpenAlert } = this;

    return (
      <>
        <ModalAlertExample
          onOpenModal={handleOpenModal}
          onOpenAlert={handleOpenAlert}
        />
      </>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(ModalAlertExampleContainer);
