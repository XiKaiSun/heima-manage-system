import {axios} from "@/request.js"
function auth() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    }
}

function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
}

logout();
function logout() {
    document.querySelector(".quit").addEventListener("click", function () {
        localStorage.removeItem("token");
        location.reload()
    })
}
getProfile()
function getProfile() {
    axios({
        url: "/v1_0/user/profile"
    }).then(r => {
        console.log(r)
        document.querySelector(".nick-name").innerHTML = "昵称 " + r.data.data.name;
    })
}
export {auth}