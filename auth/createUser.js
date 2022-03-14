import * as general from './general.js'
import * as createValidate from './createValidate.js'


import { controller } from '../app.js'




export function createUser(username, email, confirmEmail, password) {
    let salt = general.generateHash(general.createUUID())


    try {
        createValidate.validateUsername(username)
        createValidate.validateEmail(email, confirmEmail)
        createValidate.validatepassword(password)

    } catch (error) {
        throw new Error(error)
    }


    let pass = (Buffer.from(general.generateHash(password + salt), 'utf8').toString('base64')).toString()
    

    let obj = {name: username, email: email, pass : pass, salt : salt, login:false, calendar:[]}
    controller.createFile(username, JSON.stringify(obj))

}








