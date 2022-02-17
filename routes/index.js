import express from 'express'
import { controller } from '../app.js'
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
        await controller.initCalendars(data.uname)
        await controller.saveData(data.uname, JSON.stringify(obj))
    }
    else {
        obj = {name: data.uname, login:true, calendar:[], tasks: []}
        controller.createFile(data.uname, JSON.stringify(obj))
    }

    req.session.user = JSON.stringify(obj)

    

    res.sendStatus(201)
})

export default router