async function signup() {
   
    
    let data = {username : document.querySelectorAll(".Signup-container input")[0].value, mail : document.querySelectorAll(".Signup-container input")[1].value, confirmMail : document.querySelectorAll(".Signup-container input")[2].value, password : document.querySelectorAll(".Signup-container input")[3].value }
    let res = await post(data, "/signup")
}