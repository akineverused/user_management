import axios from 'axios';

const api = axios.create({
    baseURL: 'https://user-management-backend-k4b7.onrender.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        config.headers['x-user-id'] = userId;
    }
    return config;
});

export default api;