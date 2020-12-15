import axios from 'axios';

const http = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.defaults.timeout = 5000;
http.defaults.params = {};

export default http;
