async function login() {
    let data = {username : document.querySelectorAll("input")[0].value, password : document.querySelectorAll("input")[1].value }
    console.log(data);
    const response = await post(data, "/login/login")
    console.log(response);
    if (response.status === 200) {
        window.location.href = "http://localhost:8080/u/home"
    }
    
} 