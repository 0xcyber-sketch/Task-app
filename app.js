import express  from "express";

import indexRoute from './routes/index.js'
import loggedInRoute from './routes/loggedIn.js'

import errorRoute from './routes/error.js'
import calenderRoute from './routes/calender.js'
import session from "express-session";
import Controller from "./controller/controller.js";




const app = express()

export const controller = new Controller()

function setHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Set-Cookie: CookieName=CookieValue; SameSite=Strict;')
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

// routes

const routeIndex = indexRoute;
app.use('/', routeIndex)
const routeLoggedIn = loggedInRoute
app.use('/u', routeLoggedIn)


/*const routeHome = homeRoute
app.use('/', routeHome)
const routeError = errorRoute
app.use('/error', routeError)
const routeCalender = calenderRoute
app.use('/calender', routeCalender)
*/

app.listen(8080, () => console.log("listening on port 8080"))
