import axios from 'axios';
import GlobalFunction from './GlobalFunction';

// Request Interceptor
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Optionally, redirect to login if no token is present
      window.location.href = '/login';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);  // Handle error in request
  }
);

// Response Interceptor
axios.interceptors.response.use(
  function (response) {
    return response;  // If response is successful
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle 401 Unauthorized
        GlobalFunction.logOut();  // Log out the user
        window.location.href = '/login';  // Redirect to login
      } else if (error.response.status === 500) {
        // Handle server error
        window.location.href = '/error-500';  // Redirect to error page
      }
    }
    return Promise.reject(error);  // Forward the error
  }
);
