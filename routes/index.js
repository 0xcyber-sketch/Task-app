import express from 'express'
import { controller } from '../app.js'
const router = express.Router()

router.get('/', (req, res) => {

    //let user = JSON.parse(req.session.user) || undefined
    // controller.init()
    //console.log(user);



    if (req.session.login) {
        res.redirect('/u/home')
    } else {
        //controller.init()

        res.render('index.ejs')
    }
    
})

router.post('/signIn',async (req,res) => {
    let data = req.body

        let obj

        if (controller.fileExsits(data.uname)) {
            obj = JSON.parse(await controller.findUser(data.uname))
            console.log(obj);
            await controller.initCalendars(data.uname)
        }
        else {
            obj = {name: data.uname, login:true, calendar: []}
            controller.createFile(obj.name, JSON.stringify(obj))
        }

        
        req.session.user = JSON.stringify(obj)
        
        await controller.saveData(data.uname, req.session.user)

    res.sendStatus(201)
})

export default router