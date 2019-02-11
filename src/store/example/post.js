import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/example/api';

// action types
const INITIALIZE = 'post/INITIALIZE';
const INITIALIZE_POST = 'post/INITIALIZE_POST';
const CHANGE_SEARCH_INPUT = 'post/CHANGE_SEARCH_INPUT';
const CHANGE_POST_EDIT_INPUT = 'post/CHANGE_POST_EDIT_INPUT';
const WRITE_POST = 'post/WRITE_POST';
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';
const EDIT_POST = 'post/EDIT_POST';
const REMOVE_POST = 'post/REMOVE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializePost = createAction(INITIALIZE_POST);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changePostEditInput = createAction(CHANGE_POST_EDIT_INPUT);
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
  post: {
    id: '',
    title: '',
    body: '',
    tags: '',
  },
  search: {
    tag: '',
  },
  lastPage: 5,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_POST]: (state, action) => {
      return state.set('post', initialState.get('post'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_POST_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['post', name], value);
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
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
      // onPending: (state, action) => state,
      onError: (state, action) => {
        throw {
          code: '404',
          message: action.payload,
        };
      },
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { _id, title, tags, body } = action.payload.data;
        return state
          .setIn(['post', 'id'], _id)
          .setIn(['post', 'title'], title)
          .setIn(['post', 'body'], body)
          .setIn(['post', 'tags'], tags.join(', '));
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('postId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
