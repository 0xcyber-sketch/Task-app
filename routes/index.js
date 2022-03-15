import express from 'express'
import { controller } from '../app.js'
import { createUser } from '../auth/createUser.js'
const router = express.Router()

router.get('/', (req, res) => {
    let user 
    if (req.session.user !== undefined) {
         user = JSON.parse(req.session.user)
         if (user.login) {
            res.redirect('/u/home')
        }
    }

     else {
        res.render('index.ejs')
    }

})

router.post('/signIn', async (req, res) => {
    let data = req.body

    let obj

    if (controller.fileExsits(data.uname)) {
        obj = JSON.parse(await controller.findUser(data.uname))
        obj.login = true
        await controller.saveData(data.uname, JSON.stringify(obj))
    }
    else {
        obj = {name: data.uname, login:true, calendar:[]}
        controller.createFile(data.uname, JSON.stringify(obj))
    }

    req.session.user = JSON.stringify(obj)

    

    res.send({status : 201})
})

router.post('/signup', (req, res) => {
    let data = req.body
    let username = data.username
    let email = data.mail
    let conEmail = data.confirmMail
    let password = data.password
    
    try {
        createUser(username, email, conEmail, password)
        res.send(JSON.stringify({status : 201}))
    } catch (error) {
        res.send(JSON.stringify({status : 400, msg : error.toString()}))
    }
    
    
})

export default router