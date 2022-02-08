import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    if (req.session.data) {
        let value = req.session.days
        let checked
        if (!req.session.checked) {
        checked = []
        for (let i = 0;  i < value; i++) {
            checked[i] = false
        }
        req.session.checked = checked 
    }
        
        else {

            checked = req.session.checked
            
        }
        res.render('calender.ejs', {days: value, missing: (value%7), title: req.session.title, description: req.session.description, checked: checked})
    }    

router.post('/checked', (req, res) => {
    if (req.session.data) {
        let data = req.body.data
        req.session.checked[data - 1] = true
        res.sendStatus(201)

    }
})




   
})


export default router