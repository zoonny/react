import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'apis/comn/api';

// action types
const LOGIN = 'login/LOGIN';
const LOGOUT = 'login/LOGOUT';
const CHECK_LOGIN = 'login/CHECK_LOGIN';
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const TEMP_LOGIN = 'login/TEMP_LOGIN';
const INITIALIZE_LOGIN_PAGE = 'login/INITIALIZE_LOGIN_PAGE';

// action creators
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const changeInput = createAction(CHANGE_INPUT);
export const tempLogin = createAction(TEMP_LOGIN);
export const initializeLoginPage = createAction(INITIALIZE_LOGIN_PAGE);

// initial state
const initialState = Map({
  // 로그인 화면 상태
  loginPage: Map({
    id: '', // 아이디
    password: '', // 패스워드
    error: false, // 에러 발생 시
  }),
  logged: false, // 현재 로그인 상태
});

// reducer
export default handleActions(
  {
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => {
        // 로그인 성공 시
        return state.set('logged', true);
      },
      onError: (state, action) => {
        // 오류 발생 시
        return state.set('logged', false).setIn(['loginPage', 'error'], true);
      },
    }),
    ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action) => {
        const { logged } = action.payload.data;
        return state.set('logged', logged);
      },
    }),
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['loginPage', name], value);
    },
    [TEMP_LOGIN]: (state, action) => {
      return state.set('logged', true);
    },
    [INITIALIZE_LOGIN_PAGE]: (state, action) => {
      return state.set('loginPage', initialState.get('loginPage'));
    },
  },
  initialState,
);
