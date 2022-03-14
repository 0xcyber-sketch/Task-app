import express from 'express'
import { authenticate } from '../auth/authenticate.js'
import { controller } from '../app.js'
const router = express.Router()

router.get("/",  (req, res) => {
    let user
    try {
        user = JSON.parse(req.session.user)
    } catch (error) {
        user = ""
    }
    if (user.login) {
        res.redirect("/")
    } else {
        res.render("login.ejs")
    }
    

}) 

router.post('/login', async (req, res) => {
let data = req.body
let username = data.username
let pass = data.password

if (authenticate(username, pass)) {
      let  obj = JSON.parse(await controller.findUser(username))
        obj.login = true
        await controller.saveData(username, JSON.stringify(obj))
        req.session.user = JSON.stringify(obj)
    
    res.sendStatus(200)
} else {
    res.sendStatus(401)
}



})

 

export default router