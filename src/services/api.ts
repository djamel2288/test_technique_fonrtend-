import axios from 'axios'

const isProd = import.meta.env.PROD
const baseURL = isProd 
  ? 'https://my-json-server.typicode.com/djamel2288/test_technique_fonrtend-'
  : '/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
