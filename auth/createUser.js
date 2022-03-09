import * as general from './general.js'
import * as createValidate from './createValidate.js'

import crypto from "crypto"

import { controller } from '../app.js'




export function createUser(username, email, confirmEmail, password) {
    let salt = general.generateHash(general.createUUID())
    let iv = crypto.randomBytes(8).toString('hex')
    let key = crypto.randomBytes(40).toString('hex')

    try {
        createValidate.validateUsername(username)
        createValidate.validateEmail(email, confirmEmail)
        createValidate.validatepassword(password)

    } catch (error) {
        throw new Error(error)
    }
    console.log(iv);

    let pass = general.encrypt(iv, key, password + salt)

    let obj = {name: username, email: email, pass : pass, salt : salt, iv : iv, key : key, login:false, calendar:[]}
    controller.createFile(username, JSON.stringify(obj))



}








