import axios from 'axios';
const { VITE_API_URL } = import.meta.env
const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// TODO: set interceptor
calendarApi.interceptors.request.use(config => { 
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})
export default calendarApi;