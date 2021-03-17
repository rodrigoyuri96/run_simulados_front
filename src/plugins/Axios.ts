import axios from "axios";

axios.defaults.baseURL = "https://21352d82-861c-45ec-803f-c5a19fded44e.mock.pstmn.io"
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('idToken');

    if(token)
        config.headers.Authorization =  token;

    return config;
}, function (error){
    return Promise.reject(error)
});



export default axios;
