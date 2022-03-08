import express from 'express'
import { controller } from '../app.js'


const router = express.Router()

async function loadTaskFile() {
    let temp = await controller.openTaskfile()
    return temp
}

async function loadCalendarFile() {
    let temp = await controller.openCalendarfile()
    return temp
}


let lastCalendarID = 0
let lastTaskID = 0
let currentTasks = []
let currentCalendars = []
let userCalendarAmount = 0;




// Midlleware
// https://expressjs.com/en/guide/using-middleware.html#middleware.router
function getCurrentCalendarsID(user) {
    let tempList = []
    for (let i = 0; i < user.calendar.length; i++) {
        tempList.push(user.calendar[i].id)
    } 

    currentCalendars = tempList
}

router.get('/home', async (req, res) => {
    let user
    try {
        user = JSON.parse(req.session.user)
    } catch (error) {
        user = ""
    }


    if (user.login) {

        let uname = user.name
        
        lastTaskID = await loadTaskFile();
        userCalendarAmount = user.calendar.length
        getCurrentCalendarsID(user)
        lastCalendarID = await loadCalendarFile()



        res.render('loggedIn.ejs', { uname: uname, calendars: controller.getCalenders() })
    }
    else {
        res.redirect("/")
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
            let obj = { id: c.getId(), checkedDays: [], title: response.cusTitle, description: response.cusDescription, type: response.value, days: amount, tasks: [] }
            user.calendar.push(obj)
            lastCalendarID++
        await controller.saveTotalExistingCalendars("" + lastCalendarID)

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
            let obj = { id: c.getId(), checkedDays: [], title: title, description: description, type: response.value, days: amount, tasks: [] }
            user.calendar.push(obj)
            lastCalendarID++
            await controller.saveTotalExistingCalendars("" + lastCalendarID)

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

function findeIndexForCalenderID(array, x) {
    let i = 0;
    let index = -1;

    while (i < array.length && index === -1) {
        if (array[i].id === x) {
            return i
        } else {
            i++
        }

    }

    return index
}



function getCurrentTaskIDs(user, index) {
   let tempList = []
    for (let i = 0; i < user.calendar[index].tasks.length; i++) {
        tempList.push(user.calendar[index].tasks[i].taskID)
    }
    currentTasks = tempList
}


router.get('/calender/:id/', helper, async (req, res) => {
    userCalendarAmount++

    let user = JSON.parse(req.session.user)
    let cID = -1


    let cIndex = findeIndexForCalenderID(user.calendar, parseInt(req.params.id))

    getCurrentTaskIDs(user, cIndex)

    cID = user.calendar[cIndex].id


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

            for (let i = 0; i < user.calendar[cIndex].tasks.length; i++) {
                tasks.push(user.calendar[cIndex].tasks[i])

            }

            req.session.user = JSON.stringify(user)
            res.render('calender.ejs', { days: value, missing: (value % 7), title: title, description: description, checked: checked, tasks: tasks })
        }
        else {
            throw new Error("Calendar with this idea doesnt exist")
        }
    } catch (error) {
        console.log(error);
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

function findCalendarIndex(user,calendarID) {
    let index = -1
        let i = 0
        while (index === -1 && i < userCalendarAmount) {
            if (user.calendar[i].id == calendarID) {
                index = i
            }
            else {
                i++
            }
        }
        return index

}


router.post('/task/add/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    
    if (user.login) {
        let cid = parseInt(req.body.calendarID)

        let c = controller.getcalenderFromID(cid)

        controller.addTaskToCalender(c, req.body.title, req.body.description, req.body.day)


        lastTaskID++

        let t = c.findTask(lastTaskID)


        let calendarIndex = findCalendarIndex(user, cid)
        user.calendar[calendarIndex].tasks.push({ title: t.getTitle(), description: t.getDescription(), days: t.getDays() , taskID: lastTaskID})
        req.session.user = JSON.stringify(user)

        await controller.saveData(user.name, req.session.user)


        await controller.saveTotalExistingTasks("" + lastTaskID)



        res.sendStatus(201)
    }
})

// Cleanup deleted objects 
function cleanupDeletedUserCalendars(user) {
    let tempUser = user
    

    for (let i = 0; i < user.calendar.length; i++) {
        if (user.calendar[i].deleted === "true") {
            tempUser.calendar.splice(i, 1)
            i--
        }
    }
    return tempUser

}

router.post('/home/delete/calendar/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    let calendars = req.body.Calendars

    for (let i = 0; i < currentCalendars.length; i++) {
        for (let j = 0; j < calendars.length; j++) {
            if (user.calendar[i].id === calendars[j]) {
                user.calendar[i].deleted = "true"
                controller.deleteCalender(controller.getcalenderFromID(calendars[j]))
            }
        }
    }

    user = cleanupDeletedUserCalendars(user)

    req.session.user = JSON.stringify(user)
    await controller.saveData(user.name, req.session.user)


    res.sendStatus(201)
})


// Cleanup deleted task 
function cleanupDeletedTasks(user, index) {
    let tempUser = user
    

        for (let i = 0; i < tempUser.calendar[index].tasks.length; i++) {
            if (tempUser.calendar[index].tasks[i].deleted === "true") {
                tempUser.calendar[index].tasks.splice(i, 1)
                i--
            }
        }
        console.log(tempUser);
        return tempUser
    

    

}

function findIndexForcalendarID(ID, user) {
    let i = 0;
    let index = -1
    let foundCalendarInUser = false

    while (i < user.calendar.length && ! foundCalendarInUser) {
        if (user.calendar[i].id === ID) {
            foundCalendarInUser = true
            index = i
        }
        else {
            i++
        }
    }
    return index
}


// Delete tasks
router.post('/home/delete/task/', async (req, res) => {
    let user = JSON.parse(req.session.user)
    let tasks = req.body.Tasks
    let calendarID = req.body.ID
    let calendar = controller.getcalenderFromID(calendarID)
    let speceficUserCalendarIndex = findIndexForcalendarID(calendarID, user)

    for (let i = 0; i < currentTasks.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            if (user.calendar[speceficUserCalendarIndex].tasks[i].taskID === tasks[j]) {
                console.log("HEy");
                user.calendar[speceficUserCalendarIndex].tasks[i].deleted = "true"
                console.log(user.calendar[speceficUserCalendarIndex].tasks[i].deleted);
                let tempTask = calendar.findTask(tasks[j])
                controller.deleteTaskFromCalender(calendar, tempTask)
            }
        }
    }

    user = cleanupDeletedTasks(user, speceficUserCalendarIndex)
    req.session.user = JSON.stringify(user)
    await controller.saveData(user.name, req.session.user)



    res.sendStatus(201)
})

export default router