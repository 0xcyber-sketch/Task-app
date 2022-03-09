import { controller } from '../app.js'

let specialChars = [' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']

export function validateUsername(input) {
    if (controller.fileExsits(input)) {
        throw new Error("User exsits")
    }
    if (input.length < 5) {
        throw new Error("Username is not long enough")
    }

}

export function validateEmail(email1, email2) {
    if (!email1.includes("@")) {
        throw new Error("Invaild email")
    }
    if (!email2.includes("@")) {
        throw new Error("Invaild email")
    }
    if (email1 !== email2) {
        throw new Error("Emails doesn't match")

    }
}

export function validatepassword(input) {
    if (input.length < 5) {
        throw new Error("Password is not long enough")
    }
    let tempChar = ""
    for (let i = 0; i < input.length; i++) {
        if (specialChars.includes(input.charAt(i))) {
            tempChar += input.charAt(i)
        }
    }
    if (tempChar === "") {
        throw new Error("Password needs to include one of following speacial characters !" + "#$%&'()*+,-./:;<=>?@[\]^_`{|}~")

    }
}