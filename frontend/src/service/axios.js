import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://expensetracker-6373.onrender.com',
  });
  
instance.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers['Authorization'] = token;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

export default instance;