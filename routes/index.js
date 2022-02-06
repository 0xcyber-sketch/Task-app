import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.login) {
        res.redirect('/u/home')
    } else {
        res.render('index.ejs')
    }
    
})

router.post('/signIn', (req,res) => {
    let data = req.body

    req.session.login = true
    if (req.session.login) {

        let obj = {name: data.uname, calendar: []}
        req.session.user = JSON.stringify(obj)
    }
    res.sendStatus(201)
})

export default router