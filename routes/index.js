import express from 'express'
import { controller } from '../app.js'
const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.login) {
        res.redirect('/u/home')
    } else {
        controller.init()

        res.render('index.ejs')
    }
    
})

router.post('/signIn',async (req,res) => {
    let data = req.body

    req.session.login = true
    if (req.session.login) {
        let obj
        try {
             obj = JSON.parse(controller.splitString(await controller.findUser(data.uname), "'")[1])
             await controller.initCalendars(data.uname)
        } catch (e) {
             obj = {name: data.uname, login:true, calendar: []}
             
        }
        
        req.session.user = JSON.stringify(obj)
        await controller.saveData(obj.name, req.session.user)
    }
    res.sendStatus(201)
})

export default router