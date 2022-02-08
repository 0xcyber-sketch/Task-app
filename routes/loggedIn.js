import express from 'express'
import { controller } from '../app.js'


const router = express.Router()


// Midlleware
// https://expressjs.com/en/guide/using-middleware.html#middleware.router

router.get('/home', (req, res) => {
    if (req.session.login) {
        let user = JSON.parse(req.session.user)
        let uname = user.name
        res.render('loggedIn.ejs', { uname: uname })
    }

})

router.get('/create', (req, res) => {
    if (req.session.login) {
        res.render('create.ejs')
    }

})

router.post('/create/c', (req, res) => {
    const response = req.body

    try {
        if (response.value === "custom") {
            let amount = parseInt(response.days)
            let c = controller.createCalender(response.value, amount, response.cusTitle, response.cusDescription)

            let user = JSON.parse(req.session.user)
            user.calendar.push(c.getId())


            req.session.user = JSON.stringify(user)
            console.log(user);
            console.log(req.session.user);

            res.redirect('/u/calender/' + c.getId())
        }
        else if (response.value === "") {
            let amount = parseInt(response.sizes.split(' ')[0])
            let title = "This is a premade " + amount + " days calender"
            let description = "This is a basic description for " + amount + " days calender"
            let c = controller.createCalender(response.value, amount, title, description)

            console.log(controller.getCalenders());

            let user = JSON.parse(req.session.user)
            user.calendar.push(c.getId())


            req.session.user = JSON.stringify(user)


            res.redirect('/u/calender/' + c.getId())

        }
        else throw Error("This is not a real post")
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }

})


router.get('/calender/:id/', helper, (req, res) => {
    let user = JSON.parse(req.session.user)
    try {
        if (req.session.login && user.calendar.includes(parseInt(req.params.id))) {
            console.log();
    
            let value = req.days
            let title = req.title
            let description = req.description
    
            let checked
    
    
            if (!req.session.checked) {
                checked = []
                for (let i = 0; i < value; i++) {
                    checked[i] = false
                }
                req.session.checked = checked
            }
    
            else {
    
                checked = req.session.checked
    
            }
            res.render('calender.ejs', {days: value, missing: (value%7), title: title, description: description, checked: checked})}
            else {
                throw new Error("Calendar with this idea doesnt exist")
            }
    } catch (error) {
        res.redirect('/error')
    }
    

})

// Helper variables
let days
let title
let description

function helper(req, res, next) {
    try {
    let id = parseInt(req.params.id)
    let c = controller.getcalenderFromID(id)

    req.days = c.getDays()
    days = req.days
    req.title = c.getTitle()
    title = req.title
    req.description = c.getDescription()
    description = req.description
} catch (e) {
        req.days = days
        req.title = title
        req.description = description
    }
    
    
    next()
}

router.post('/day/checked/', (req, res) => {
    if (req.session.login) {
        console.log("AYE");
        let data = req.body.data
        req.session.checked[data - 1] = true
        res.sendStatus(201)

    }
})

router.post('/task/add/', (req, res) => {
    if (req.session.login) {
        let user = JSON.parse(req.session.user)
        
        
        console.log("Aye");
        let data = req.body
        console.log(data);
        res.sendStatus(201)
    }
})


export default router