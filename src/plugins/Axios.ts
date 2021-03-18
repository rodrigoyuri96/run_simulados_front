import axios from "axios";

axios.defaults.baseURL = "https://6223ebc2-0c75-4b56-9f44-df3b6425b2f9.mock.pstmn.io"
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('idToken');

    if(token)
        config.headers.Authorization =  token;

    return config;
}, function (error){
    return Promise.reject(error)
});



export default axios;
