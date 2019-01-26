import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/example/api';

// action types
const INITIALIZE = 'post/INITIALIZE';
const CHANGE_INPUT = 'post/CHANGE_INPUT';
const OPEN_POST_EDIT_MODAL = 'post/OPEN_EDIT_MODAL';
const CHANGE_POST_EDIT_INPUT = 'post/CHANGE_POST_EDIT_INPUT';
const INITIALIZE_POST_EDIT = 'post/INITIALIZE_POST_EDIT';
const WRITE_POST = 'post/WRITE_POST';
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';
const EDIT_POST = 'post/EDIT_POST';
const REMOVE_POST = 'post/REMOVE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const openPostEditModal = createAction(OPEN_POST_EDIT_MODAL);
export const changePostEditInput = createAction(CHANGE_POST_EDIT_INPUT);
export const initializePostEdit = createAction(INITIALIZE_POST_EDIT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPostList = createAction(
  GET_POST_LIST,
  api.getPostList,
  meta => meta,
);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const removePost = createAction(REMOVE_POST, api.removePost);

// initial state
const initialState = fromJS({
  posts: [],
  tag: '',
  postEditModal: {
    visible: false,
    editMode: 'w', // w:write | r:read | e:edit
    post: {
      id: '',
      title: '',
      body: '',
      tags: '',
    },
    opts: {
      readOnly: false,
    },
  },
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    [OPEN_POST_EDIT_MODAL]: (state, action) => {
      const { visible, editMode, post } = action.payload;
      return (
        state
          .setIn(['postEditModal', 'visible'], visible)
          .setIn(['postEditModal', 'editMode'], editMode)
          // post 설정은 getPost에서 처리
          // .setIn(
          //   ['postEditModal', 'post'],
          //   post ? post : state.getIn(['postEditModal', 'post']),
          // )
          .setIn(
            ['postEditModal', 'opts', 'readOnly'],
            editMode === 'r' ? true : false,
          )
      );
    },
    [CHANGE_POST_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['postEditModal', 'post', name], value);
    },
    [INITIALIZE_POST_EDIT]: (state, action) => {
      return state.set('postEditModal', initialState.get('postEditModal'));
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
    }),
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        const { data: posts } = action.payload;
        console.table(posts);
        let _lastPage = action.payload.headers['Last-Page'];
        const lastPage = _lastPage ? _lastPage : '5';
        return state
          .set('posts', fromJS(posts))
          .set('lastPage', parseInt(lastPage, 10));
      },
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { _id, title, tags, body } = action.payload.data;
        return state
          .setIn(['postEditModal', 'post', 'id'], _id)
          .setIn(['postEditModal', 'post', 'title'], title)
          .setIn(['postEditModal', 'post', 'body'], body)
          .setIn(['postEditModal', 'post', 'tags'], tags.join(', '));
      },
    }),
    ...pender({
      type: EDIT_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
    }),
    ...pender({
      type: REMOVE_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
    }),
  },
  initialState,
);
