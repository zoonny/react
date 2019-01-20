import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FooterContainer extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="https://www.kt.com">KT</a> &copy; 2019 copyright.
        </span>
        <span className="ml-auto">
          <a href="https://www.kt.com">
            Medical Information Mediation Platform
          </a>
        </span>
      </React.Fragment>
    );
  }
}

FooterContainer.propTypes = propTypes;
FooterContainer.defaultProps = defaultProps;

export default FooterContainer;
