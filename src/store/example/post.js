import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/example/api';

// action types
const INITIALIZE = 'post/INITIALIZE';
const CHANGE_SEARCH_INPUT = 'post/CHANGE_SEARCH_INPUT';
const OPEN_POST_EDIT_MODAL = 'post/OPEN_EDIT_MODAL';
const CHANGE_POST_EDIT_INPUT = 'post/CHANGE_POST_EDIT_INPUT';
const INITIALIZE_POST_EDIT = 'post/INITIALIZE_POST_EDIT';
const CHANGE_PAGE = 'post/CHANGE_PAGE';

const WRITE_POST = 'post/WRITE_POST';
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';
const EDIT_POST = 'post/EDIT_POST';
const REMOVE_POST = 'post/REMOVE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const openPostEditModal = createAction(OPEN_POST_EDIT_MODAL);
export const changePostEditInput = createAction(CHANGE_POST_EDIT_INPUT);
export const initializePostEdit = createAction(INITIALIZE_POST_EDIT);
export const changePage = createAction(CHANGE_PAGE);

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
  edit: {
    visible: false,
    mode: 'w', // w:write | r:read | e:edit
    opts: {
      readOnly: false,
    },
  },
  paging: {
    page: 1,
    lastPage: 5,
    pageCount: 3,
  },
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [OPEN_POST_EDIT_MODAL]: (state, action) => {
      const { visible, mode, post } = action.payload;
      return state
        .setIn(['edit', 'visible'], visible)
        .setIn(['edit', 'mode'], mode)
        .setIn(['edit', 'opts', 'readOnly'], mode === 'r' ? true : false);
    },
    [CHANGE_POST_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['edit', 'post', name], value);
    },
    [INITIALIZE_POST_EDIT]: (state, action) => {
      return state.set('edit', initialState.get('edit'));
    },
    [CHANGE_PAGE]: (state, action) => {
      const { view, page } = action.payload;
      return state.setIn(['paging', 'page'], page);
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
          .setIn(['paging', 'lastPage'], parseInt(lastPage, 10));
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
