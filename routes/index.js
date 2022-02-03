import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.post('/signIn', (req,res) => {
    let data = req.body

    req.session.login = true
    if (req.session.login) {
        req.session.name = data.uname
    }
    res.sendStatus(201)
})

export default router