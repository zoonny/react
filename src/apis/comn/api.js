import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const login = ({ id, password }) =>
  axios.post(`${apiUrl}/api/auth/login`, { id, password });
export const checkLogin = () => axios.get(`${apiUrl}/api/auth/check`);
export const logout = () => axios.post(`${apiUrl}/api/auth/logout`);

export const getMenu = () => axios.get(`/api/menu/get.json`);
