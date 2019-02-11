import React, { Component } from 'react';

const withPaging = WrappedComponent => {
  return class extends Component {
    state = {
      paging: {
        page: 1,
        pageCount: 3,
      },
    };

    componentDidMount() {}

    // Paging
    handleChangePage = async page => {
      this.setState({
        ...this.state,
        paging: {
          ...this.state.paging,
          page: page,
        },
      });
    };

    render() {
      const { paging } = this.state;
      const { handleChangePage } = this;

      return (
        <WrappedComponent
          {...this.props}
          paging={paging}
          onChangePage={handleChangePage}
        />
      );
    }
  };
};

export default withPaging;
