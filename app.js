import express  from "express";

import indexRoute from './routes/index.js'
import loggedInRoute from './routes/loggedIn.js'
import errorRoute from './routes/error.js'
import logOutRoute from './routes/logout.js'
import loginRoute from './routes/login.js'

import session from "express-session";
import Controller from "./controller/controller.js";




const app = express()


export let startup = false

export const controller = new Controller()

export function setStartUp() {
    startup = !startup
}

function setHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Set-Cookie: CookieName=CookieValue; SameSite=Strict;')
    next()
}

// set session
async function setSession (req, res, next) {
    if (startup === false) {
    let data = await controller.init()
    if (data !== "") {
        let user = JSON.parse(await controller.findUser(data))
        req.session.user = JSON.stringify(user)
    }
    
    startup = true;
}
    next()
}

app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())
app.set("view engine", "ejs")
app.use(session({
    secret: "We'll live long",
    saveUninitialized: false,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null, sameSite: "lax"}
}))
app.use(setHeader)
app.use(setSession)

// routes

const routeIndex = indexRoute;
app.use('/', routeIndex)
const routeLoggedIn = loggedInRoute
app.use('/u', routeLoggedIn)
const routeError = errorRoute
app.use('/error', routeError)

const routeLogOut = logOutRoute
app.use('/logout', routeLogOut)

const routeLogin = loginRoute
app.use('/login', routeLogin)



app.listen(8080, () => console.log("listening on port 8080"))
