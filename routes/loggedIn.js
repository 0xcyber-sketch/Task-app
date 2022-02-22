import express from 'express'
import { controller } from '../app.js'


const router = express.Router()

let _taskID = 0




// Midlleware
// https://expressjs.com/en/guide/using-middleware.html#middleware.router

router.get('/home', (req, res) => {
    let user = JSON.parse(req.session.user)

    if (user.login) {
        
        let uname = user.name
        res.render('loggedIn.ejs', { uname: uname, calendars: controller.getCalenders() })
    }

})

router.get('/create', (req, res) => {
    let user = JSON.parse(req.session.user)
    if (user.login) {
        res.render('create.ejs')
    }

})

router.post('/create/c', async (req, res) => {
    const response = req.body


    try {
        if (response.value === "custom") {
            let amount = parseInt(response.days)
            let c = controller.createCalender(response.value, amount, response.cusTitle, response.cusDescription)

            let user = JSON.parse(req.session.user)
            let obj = {id: c.getId(), checkedDays: [], title: response.cusTitle, description: response.cusDescription, type: response.value, days: amount, taskID: -1}
            user.calendar.push(obj)


            req.session.user = JSON.stringify(user)

            await controller.saveData(user.name, req.session.user)
            res.redirect('/u/calender/' + c.getId())
        }
        else if (response.value === "") {
            let amount = parseInt(response.sizes.split(' ')[0])
            let title = amount + " days calender"
            let description = "This is a basic description for a premade calendar with " + amount + " of days"
            let c = controller.createCalender(response.value, amount, title, description)


            let user = JSON.parse(req.session.user)
            let obj = {id: c.getId(), checkedDays: [], title: title, description: description, type: response.value, days: amount, taskID: -1}
            user.calendar.push(obj)


            req.session.user = JSON.stringify(user)
            
            await controller.saveData(user.name, req.session.user)


            res.redirect('/u/calender/' + c.getId())

        }
        else throw Error("This is not a real post")
    } catch (error) {
        console.log(error);
        res.redirect('/error')
    }

})

function findeIndexForCalenderID (array, x) {
    let i = 0;
    let index = -1;

    while (i < array.length && index === -1) {
        if(array[i].id === x) {
            return i
        } else {
            i++
        }

    }
    
    return index 
}


router.get('/calender/:id/', helper, async (req, res) => {


    let user = JSON.parse(req.session.user)
    let cID = -1

    let cIndex = findeIndexForCalenderID(user.calendar, parseInt(req.params.id))

    cID = user.calendar[cIndex].id

    _taskID = user.tasks.length

    try {
        if (user.login && cID !== -1) {
    
            let value = req.days
            let title = req.title
            let description = req.description
    

            let checked = user.calendar[cIndex].checkedDays
    
            if (checked.length === 0) {
                for (let i = 0; i < value; i++) {
                    checked[i] = false
                }
                user.calendar[cIndex].checkedDays = checked

               
            }
    
            else {
    
                checked = user.calendar[cIndex].checkedDays
    
            }

            let tasks = []

            for (let i =0 ; i < user.tasks.length; i++) {
                if (user.tasks[i].calendarID === cID) {
                    tasks.push(user.tasks[i])
                }
            }

            req.session.user = JSON.stringify(user)
            res.render('calender.ejs', {days: value, missing: (value%7), title: title, description: description, checked: checked, tasks: tasks})}
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

router.post('/day/checked/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    if (user.login) {
        
        let cID = req.body.calendarId

        let data = req.body.data

        let cIndex = findeIndexForCalenderID(user.calendar, cID)
        user.calendar[cIndex].checkedDays[data - 1] = true
        req.session.user = JSON.stringify(user)
        await controller.saveData(user.name, req.session.user)

        
        res.sendStatus(201)

    }
})

router.post('/task/add/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    if (user.login) {
        let cid = parseInt(req.body.calendarID)
        
        let c = controller.getcalenderFromID(cid)

        controller.addTaskToCalender(c, req.body.title, req.body.description, req.body.day)
  
        _taskID++
        user.calendar[cid - 1].taskID = _taskID
        let t = c.findTask(_taskID) 
        
        user.tasks.push({title: t.getTitle(), description: t.getDescription(), days: t.getDays(), calendarID: cid})
        req.session.user = JSON.stringify(user)

        await controller.saveData(user.name, req.session.user)


        res.sendStatus(201)
    }
})

router.post('/home/delete/calendar/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    let calendars = req.body.Calendars

    for (let i = 0; i < calendars.length; i++) { 

        user.calendar.splice(calendars[i -1], 1); 
        controller.deleteCalender(controller.getcalenderFromID(calendars[i]))
    }
    
    req.session.user = JSON.stringify(user)
    await controller.saveData(user.name, req.session.user)


    res.sendStatus(201)
})

export default router