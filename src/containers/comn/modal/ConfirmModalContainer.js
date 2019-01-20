import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import ConfirmModal from 'views/comn/modal/ConfirmModal';
import { withRouter } from 'react-router-dom';

class ConfirmModalContainer extends Component {
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('confirm');
  };

  handleConfirm = () => {
    console.log('handleConfirm');
  };

  toggle = () => {
    this.handleCancel();
  };

  render() {
    const { visible } = this.props;
    const { handleCancel, handleConfirm, toggle } = this;

    return (
      <ConfirmModal
        visible={visible}
        toggle={toggle}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        className={null}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(['modal', 'confirm']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(withRouter(ConfirmModalContainer));
