import express from 'express'
import {controller} from '../app.js'


const router = express.Router()



router.get('/home', (req, res) => {
    if (req.session.login) {
        res.render('loggedIn.ejs', {uname: req.session.name})
    }
    
})

router.get('/create', (req, res) => {
    if (req.session.login) {
        res.render('create.ejs')
    }
    
})

router.post('/create/c', (req, res) => {
        const response = req.body
        console.log(response);

        console.log(controller.getCalenders());
        let c1 = controller.createCalender()
        console.log(c1.getId());
        let c2 = controller.createCalender()
        console.log(c2.getId());
/*
        try {
            if (response.value === "custom") {
                

                req.session.data = "custom"
                let amount =  parseInt(response.days)
                req.session.days = amount
                req.session.title = "" + response.cusTitle
                req.session.description = "" + response.cusDescription
                res.redirect('/calender')
            }
            else if (response.value === "") {
                req.session.data = "pre"
                let amount =  parseInt(response.sizes.split(' ')[0])
                req.session.days = amount
                req.session.title = "This is a premade " + amount + " days calender"
                req.session.description = "This is a basic description for " + amount + " days calender"
    
    
                res.redirect('/')
    
            }
            else throw Error("This is not a real post")
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        } */
    
})



export default router