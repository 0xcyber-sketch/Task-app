import express from 'express'
import controller from '../controller/controller.js'

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



export default router