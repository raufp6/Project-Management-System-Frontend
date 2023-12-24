import axios from 'axios'

const api_request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})


api_request.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, add authentication headers
    const authToken = localStorage.getItem('authTokens')
          ? JSON.parse(localStorage.getItem('authTokens'))
          : null
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken.access}`
    }
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

api_request.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response
  },
  (error) => {
    
    if (error.response && error.response.status === 403) {
      console.log(error);
      localStorage.removeItem('authTokens')
      window.location.href = '/auth?e=authTokens'
    }
    if (error.response && error.response.status === 404) {
    }
    return Promise.reject(error)
    
  }
)

export default api_request



