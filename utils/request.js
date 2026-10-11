import axios from "axios";
export {axios}
axios.defaults.baseURL = "https://geek.itheima.net/";
axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).token : "";
    if (token) {
        config.headers.Authorization = `Bears ${token}`;
    }
    return config
})

axios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        window.localStorage.getItem("token") && window.localStorage.removeItem("token");
        myAlert(false, "身份验证失败")
        setTimeout(() => {
            location.href = "./../login/"
        }, 2000)
    }
    throw error
})