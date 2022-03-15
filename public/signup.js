async function signup() {

    let username = document.querySelectorAll(".Signup-container input")[0].value
    let mail = document.querySelectorAll(".Signup-container input")[1].value
    let conmail = document.querySelectorAll(".Signup-container input")[2].value
    let pass = document.querySelectorAll(".Signup-container input")[3].value

    let errorMessageNode = document.querySelectorAll(".Signup-container .error-message")[0]

    let validateEmailResult = validateMail(mail, conmail)
    let validatePasswordResult = validatePassword(pass)
    if (!validateUsername(username)) {
        errorMessageNode.style.display = "block"
        errorMessageNode.firstElementChild.innerText = "Username length must be atleast 5 chars"
    }
    else if (!(validateEmailResult === -1)) {
        if (validateEmailResult === 0) {
            errorMessageNode.style.display = "block"
            errorMessageNode.firstElementChild.innerText = "Email is invaild. Email have to contain @"
        } else if (validateEmailResult === 1) {
            errorMessageNode.style.display = "block"
            errorMessageNode.firstElementChild.innerText = "Confirmation email is invaild. Email have to contain @"
        } else {
            errorMessageNode.style.display = "block"
            errorMessageNode.firstElementChild.innerText = "Email and confirmation email does not match"
        }
    }
    else if (!(validatePasswordResult === -1)) {
        if (validatePasswordResult === 0) {
            errorMessageNode.style.display = "block"
        errorMessageNode.firstElementChild.innerText = "Password length must be atleast 5 chars"
        } 
        else if (validatePasswordResult === 1){
            errorMessageNode.style.display = "block"
        errorMessageNode.firstElementChild.innerText = "Password needs to include one of following speacial characters !" + "#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
        }
    }
    else {

        let data = { username: username, mail: mail, confirmMail: conmail, password: pass }
        let res = await post(data, "/signup")
        console.log(res.status);
        if (res.status === 201) {
            window.location.href = "http://localhost:8080/login"
        }
    }
}

function validateUsername(username) {
    if (username.length >= 5) {
        return true
    }
    return false
}

function validateMail(email, conEmail) {
    if (!email.includes("@")) {
        return 0
    }
    else if (!conEmail.includes("@")) {
        return 1
    }
    else if (!(email === conEmail)) {
        return 2
    }

    return -1
}

function validatePassword(password) {
    let specialChars = [' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']

    if (password.length < 5) {
        return 0
    }
    let tempChar = ""
    for (let i = 0; i < password.length; i++) {
        if (specialChars.includes(password.charAt(i))) {
            tempChar += password.charAt(i)
        }
    }
    if (tempChar === "") {
        return 1
    }

    return -1
}