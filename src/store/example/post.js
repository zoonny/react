import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/example/api';

// action types
const INITIALIZE = 'post/INITIALIZE';
const CHANGE_INPUT = 'post/CHANGE_INPUT';
const WRITE_POST = 'post/WRITE_POST';
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';
const EDIT_POST = 'post/EDIT_POST';
const REMOVE_POST = 'post/REMOVE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
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
const initialState = Map({
  posts: List(),
  lastPage: null,
  post: Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null,
  }),
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
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
        let temp = action.payload.headers['Last-Page'];
        const lastPage = temp ? temp : '5';
        if (!lastPage) {
          console.error(action.payload.headers);
        }
        return state
          .set('posts', fromJS(posts))
          .set('lastPage', parseInt(lastPage, 10));
      },
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { title, tags, body } = action.payload.data;
        return state
          .set('title', title)
          .set('markdown', body)
          .set('tags', tags.join(', ')); // 배열 -> ,로 구분된 문자열
      },
    }),
  },
  initialState,
);
