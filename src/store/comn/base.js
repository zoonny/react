import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'apis/comn/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const SHOW_ALERT = 'base/SHOW_ALERT';
const HIDE_ALERT = 'base/HIDE_ALERT';
const GET_MENU = 'base/GET_MENU';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const showAlert = createAction(SHOW_ALERT);
export const hideAlert = createAction(HIDE_ALERT);
export const getMenu = createAction(GET_MENU, api.getMenu);

// initial state
const initialState = fromJS({
  // 모달의 가시성 상태
  modal: {
    confirm: {
      visible: false,
      title: '',
      message: '',
      onConfirm: null,
      args: null,
    }, // 추후 구현될 로그인 모달
  },
  // Alert의 가시성 상태
  alert: {
    warning: false, // 추후 구현될 Alert
  },
  menu: [],
});

// reducer
export default handleActions(
  {
    [SHOW_MODAL]: (state, action) => {
      const { modalName, title, message, onConfirm, args } = action.payload;
      return state
        .setIn(['modal', modalName, 'visible'], true)
        .setIn(['modal', modalName, 'title'], title)
        .setIn(['modal', modalName, 'message'], message)
        .setIn(['modal', modalName, 'onConfirm'], onConfirm)
        .setIn(['modal', modalName, 'args'], args);
    },
    [HIDE_MODAL]: (state, action) => {
      const { modalName } = action.payload;
      return state
        .setIn(['modal', modalName, 'visible'], false)
        .setIn(['modal', modalName, 'title'], '')
        .setIn(['modal', modalName, 'message'], '')
        .setIn(['modal', modalName, 'onConfirm'], null)
        .setIn(['modal', modalName, 'args'], null);
    },
    [SHOW_ALERT]: (state, action) => {
      const { payload: alertName } = action;
      return state.setIn(['alert', alertName], true);
    },
    [HIDE_ALERT]: (state, action) => {
      const { payload: alertName } = action;
      return state.setIn(['alert', alertName], false);
    },
    ...pender({
      type: GET_MENU,
      onSuccess: (state, action) => {
        return state.set('menu', action.payload.data);
      },
    }),
  },
  initialState,
);
