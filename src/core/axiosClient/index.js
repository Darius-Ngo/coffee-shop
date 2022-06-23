import axios from 'axios';

const axiosClient = () => {
    const defaultOptions = {
      baseURL: 'https://co-coffeeshop.herokuapp.com', //https://co-coffeeshop.herokuapp.com
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    };
  
    // Create instance
    let instance = axios.create(defaultOptions);
  
    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
      return config;
    });
  
    return instance;
  };
  
export default axiosClient();