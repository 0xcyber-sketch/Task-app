import * as general from './general.js'
import { controller } from '../app.js'


export async function authenticate(username, password) {

    if (!userExsits(username)) {
        throw new Error("User or password is wrong")

    }

    let data = await controller.getSaltAndPassFromUser(username)

    let pass = (Buffer.from(general.generateHash(password + data[1]), 'utf8').toString('base64')).toString()

    if (!(pass === data[0])) {
        throw new Error("User or password is wrong")
    }
    return true
}

function userExsits(username) {
    return controller.fileExsits(username)
}