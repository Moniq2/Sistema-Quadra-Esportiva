import axios from 'axios'

const apiHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || `http://${apiHost}:3000`,
})

export default api
