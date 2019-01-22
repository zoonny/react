import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPostList = ({ tag, page }) =>
  axios.get(`${apiUrl}/api/posts/?${queryString.stringify({ tag, page })}`);
export const getPost = id => axios.get(`${apiUrl}/api/posts/${id}`);
export const writePost = ({ title, body, tags }) =>
  axios.post(`${apiUrl}/api/posts`, { title, body, tags });
// export const editPost = ({ id, title, body, tags }) =>
//   axios.patch(`${apiUrl}/api/posts/${id}`, { title, body, tags });
export const editPost = ({ id, title, body, tags }) =>
  axios.post(`${apiUrl}/api/posts/${id}`, { title, body, tags });
export const removePost = id => axios.delete(`${apiUrl}/api/posts/${id}`);
