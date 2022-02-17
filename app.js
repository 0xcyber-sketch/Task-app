import express  from "express";

import indexRoute from './routes/index.js'
import loggedInRoute from './routes/loggedIn.js'
import errorRoute from './routes/error.js'
import logOutRoute from './routes/logout.js'

import session from "express-session";
import Controller from "./controller/controller.js";




const app = express()


let startup = false

export const controller = new Controller()


function setHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Set-Cookie: CookieName=CookieValue; SameSite=Strict;')
    //res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()
}

// set session
async function setSession (req, res, next) {
    if (startup === false) {
    let data = await controller.init()
    if (data !== "") {
        req.session.user = JSON.stringify(JSON.parse(await controller.findUser(data)))
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



app.listen(8080, () => console.log("listening on port 8080"))
