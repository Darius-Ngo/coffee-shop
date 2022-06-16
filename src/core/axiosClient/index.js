import axios from 'axios';

// const axiosClient = axios.create({
//     baseURL: 'https://co-coffeeshop.herokuapp.com/',
//     headers: {
//         // Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//     }
// });

// // Add a request interceptors
// // axios.interceptors.request.use(function (config) {
// //     // const token = store.getState().session.token;
// //     const token = localStorage.getItem('token');
// //     config.headers.Authorization =  token;
// //     // Do something before request is sent
// //     return config;
// // }, function (error) {
// //     // Do something with request error
// //     return Promise.reject(error);
// // });
// instance.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('token');
//     config.headers.Authorization =  token ? `Bearer ${token}` : '';
//     return config;
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });


// export default axiosClient;

const axiosClient = () => {
    const defaultOptions = {
      baseURL: 'https://co-coffeeshop.herokuapp.com/',
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