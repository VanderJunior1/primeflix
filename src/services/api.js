import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'    
})

api.interceptors.request.use((request) => {
    request.params = {
        ...(request.params || {}),  // mantém params já definidos na chamada
        api_key: process.env.REACT_APP_API_KEY,
        language: 'pt-BR'
    };
    return request;
}, (error) => {
    return Promise.reject(error);
});

export default api;