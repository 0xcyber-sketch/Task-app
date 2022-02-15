import express from 'express'
import { controller } from '../app.js'
const router = express.Router()

router.get("/", async (req, res) => {
    let user = JSON.parse(req.session.user)

    req.session.destroy( err => {
        if (err) {
            res.sendStatus(400)
        } else {
            user.login = false
            controller.saveData(user.name, JSON.stringify(user))

            res.send({status: "logged out"})
            
        }
    })

}) 

export default router