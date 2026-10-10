import "./index.css"
import { myAlert } from "@/alert.js"
import {axios} from "@/request.js"
import "../../mode.js"
document.querySelector(".login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(1)
    const data = {};
    $(this).serializeArray().forEach(item => {
        data[item.name] = item.value;
    })
    console.log(data)
    axios({
        url: "/v1_0/authorizations",
        method: "POST",
        data
    }).then(r => {
        console.log(r);
        myAlert(true, "登录成功")
        localStorage.setItem("token", JSON.stringify(r.data.data));
        setTimeout(() => {
            location.href = "content.html"
        }, 1500)
    }).catch(e => {
        console.dir(e)
        myAlert(false, e.response.data.message)
    })
})
console.warn(456)