import axios from "axios";

axios.defaults.baseURL = 'https://8a6a12b0-3178-4d8f-b02d-fdfd91b69620.mock.pstmn.io'
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('idToken');

    if(token)
        config.headers.Authorization =  token;

    return config;
}, function (error){
    return Promise.reject(error)
});



export default axios;
