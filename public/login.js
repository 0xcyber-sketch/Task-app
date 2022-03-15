async function login() {
    let data = {username : document.querySelectorAll("input")[0].value, password : document.querySelectorAll("input")[1].value }
    const response = await post(data,"/login/login")
    if (response.status === 200) {
        window.location.href = "http://localhost:8080/u/home"
    }
    else {
        let errorMessageNode = document.querySelectorAll(".error-message")[0]

        errorMessageNode.style.display = "block"
        errorMessageNode.firstElementChild.innerText = response.msg
    }
    
} 