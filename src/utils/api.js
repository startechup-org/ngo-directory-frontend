import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const get = (path, options) =>
  axios.get(`${baseURL}${path}`, options);

const post = (path, options, headers) =>
  axios.post(`${baseURL}${path}`, options, headers);

const patch = (path, options, headers) =>
  axios.patch(`${baseURL}${path}`, options, headers);

const delete_ = (path, options) =>
    axios.delete(`${baseURL}${path}`, options);
  
export default {
    get, post, patch, delete_
};
      