import axios from 'axios';
import {toast} from 'react-toastify';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/`,
  // other custom settings
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwtToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    showError(error)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
  
);

const showError = (err) => {
  console.log(err);
  if (err?.response?.data.message) {
      toast.error(err.response?.data.message);
  } else if (err?.message) {
      toast.error(err.message);
  } else {
      toast.error(err);
  }
}

export default instance;