import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    const data = req.session.data
    if (data) {
        res.redirect('/calender')
    }
    else {
        res.render('home.ejs')
    }
    
})

router.post('/create', (req, res) => {
    const response = req.body

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
    }

})

export default router