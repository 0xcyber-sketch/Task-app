import express  from "express";
import homeRoute from './routes/home.js'
import errorRoute from './routes/error.js'
import calenderRoute from './routes/calender.js'
import session from "express-session";




const app = express()

function setHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next()
}

app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())
app.set("view engine", "ejs")
app.use(session({
    secret: "We'll live long",
    saveUninitialized: false
}))
app.use(setHeader)

// routes
const routeHome = homeRoute
app.use('/', routeHome)
const routeError = errorRoute
app.use('/error', routeError)
const routeCalender = calenderRoute
app.use('/calender', routeCalender)


app.listen(8080, () => console.log("listening on port 8080"))
