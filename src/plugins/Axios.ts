import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8090';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('idToken');

    if(token)
        config.headers.Authorization =  token;

    return config;
}, function (error){
    return Promise.reject(error)
});



export default axios;
