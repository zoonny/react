import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import ConfirmModal from 'views/comn/modal/ConfirmModal';

class ConfirmModalContainer extends Component {
  handleCancel = e => {
    const { BaseActions } = this.props;
    BaseActions.hideModal({ modalName: 'confirm' });
  };

  toggle = e => {
    this.handleCancel();
  };

  render() {
    const { visible, title, message, onConfirm, args } = this.props;
    const { handleCancel, toggle } = this;

    return (
      <ConfirmModal
        visible={visible}
        toggle={toggle}
        title={title}
        message={message}
        args={args}
        onConfirm={onConfirm}
        onCancel={handleCancel}
        className={null}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(['modal', 'confirm', 'visible']),
    title: state.base.getIn(['modal', 'confirm', 'title']),
    message: state.base.getIn(['modal', 'confirm', 'message']),
    onConfirm: state.base.getIn(['modal', 'confirm', 'onConfirm']),
    args: state.base.getIn(['modal', 'confirm', 'args']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(ConfirmModalContainer);
