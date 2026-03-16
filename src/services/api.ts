import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Proxy set up in vite.config.ts points to http://localhost:3001
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
