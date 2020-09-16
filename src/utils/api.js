import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const get = (path, options) =>
  axios.get(`${baseURL}${path}`, options);

const post = (path, options, headers) =>
  axios.post(`${baseURL}${path}`, options, headers);

const put = (path, options, headers) =>
  axios.put(`${baseURL}${path}`, options, headers);

const delete_ = (path, options) =>
    axios.delete(`${baseURL}${path}`, options);
  
export default {
    get, post, put, delete_
};
      