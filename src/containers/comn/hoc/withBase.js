import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';

console.warn('This component is deprecated.');

const withBase = WrappedComponent => {
  return class extends Component {
    componentDidMount() {}

    showConfirm = (title, message, onConfirm, args) => {
      const { BaseActions } = this.props;

      BaseActions.showModal({
        modalName: 'confirm',
        title,
        message,
        onConfirm,
        args,
      });
    };

    hideConfirm = () => {
      const { BaseActions } = this.props;

      BaseActions.hideModal({
        modalName: 'confirm',
      });
    };

    render() {
      const { showConfirm, hideConfirm } = this;

      return (
        <WrappedComponent
          {...this.props}
          showConfirm={showConfirm}
          hideConfirm={hideConfirm}
        />
      );
    }
  };
};

// export default connect(
//   state => ({
//     args: state.base.getIn(['modal', 'confirm', 'args']),
//   }),
//   dispatch => ({
//     BaseActions: bindActionCreators(baseActions, dispatch),
//   }),
// )(withBase);

export default withBase;
