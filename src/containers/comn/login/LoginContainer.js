import React, { Component } from 'react';
import { Login } from 'views/comn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/comn/login';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

class LoginContainer extends Component {
  handleLogin = async () => {
    const { LoginActions, id, password } = this.props;

    let res = null;
    try {
      // 로그인 시도
      res = await LoginActions.login({ id, password });
    } catch (e) {
      console.error(e);
      this.props.alert.show('잘못된 아이디 또는 비밀번호입니다.');
    }

    if (res) {
      const { success } = res.data;
      const { logged, history } = this.props;

      console.log('logged', logged, 'success', success);
      if (success && logged) {
        history.push('/main');
      }

      LoginActions.initializeLoginPage();
    }
  };

  handleChangeInput = e => {
    const { value, name } = e.target;

    const { LoginActions } = this.props;
    LoginActions.changeInput({ name, value });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  render() {
    const { id, password, error } = this.props;
    const { handleLogin, handleChangeInput, handleKeyPress } = this;

    return (
      <Login
        id={id}
        password={password}
        onLogin={handleLogin}
        onChangeInput={handleChangeInput}
        onKeyPress={handleKeyPress}
        error={error}
      />
    );
  }
}

export default connect(
  state => ({
    id: state.login.getIn(['loginPage', 'id']),
    password: state.login.getIn(['loginPage', 'password']),
    error: state.login.getIn(['loginPage', 'error']),
    logged: state.login.get('logged'),
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
  }),
)(withAlert(withRouter(LoginContainer)));
