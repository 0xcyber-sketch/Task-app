import Factory from "../models/factory.js"
import Task from "../models/task.js"
import fs from "fs/promises"
import { existsSync } from 'fs'


class Controller {
    #fac = new Factory()
    #calenders
    #dir = "./.session/"
    #path = this.#dir + "session.txt"
    constructor() {
        this.#calenders = []
    }
    createCalender(type, days, title, description) {
        try {
            let c = this.#fac.createCalenderFactory(type, days, title, description)
            this.#calenders.push(c)
            return c
        }
        catch (e) {
            throw new Error(e)
        }
    }


    updateTask(task, title, description) {
        let oldT = task.getTitle()

        let newT = title

        if (newT === '') {
            newT = oldT
        }

        task.setTitle(newT)
        task.setDescription(description)

    }

    deleteTaskFromCalender(calender, task) {
        calender.deleteTask(task)

    }

    addTaskToCalender(calender, title, description, day) {
        calender.addTask(new Task(title, description, day))
    }

    getcalenderFromID(id) {
        let i = this.#findcalenderSearch(id)
        if (i !== -1) {
            return this.#calenders[i]
        } else {
            throw new Error("Calender is not in the calender list")
        }
    }

    getCalenders() {
        return [...this.#calenders]
    }


    #findcalenderSearch(x) {
        let index = -1
        let i = 0
        while (index === -1 && i < this.#calenders.length) {
            if (this.#calenders[i].getId() === x) {
                index = i
            }
            else {
                i++
            }
        }
        return index
    }

    deleteCalender(calender) {
        let i = this.#findcalenderSearch(calender.getId())
        if (i !== -1) {
            this.#calenders.splice(i, 1)
        }
    }

    // Validating 

    async init() {

        if (!(existsSync(this.#dir))) {
            await fs.mkdir(this.#dir)
            await fs.writeFile(this.#path, "")
        }
    }

    async findUser(input) {

        let data = await fs.readFile(this.#path, 'utf-8')


        let regex = new RegExp(`.*(?=${input}).*`, "g")

        let result = data.match(regex)
        if (result === null) {
            throw new Error("username is not saved")
        }
        return result[0]
    }

    async saveData(input, newData) {
        let data = await fs.readFile(this.#path, 'utf-8')
        let find
        let inData

        try {
            find = await this.findUser(input)
            if (find) {
                inData = true
            }
        } catch (error) {
            inData = false
        }

        if (inData) {
            if (newData !== find) {
                let regex = new RegExp(`................(?=${input}).*`, "gs")
                let tempData
                tempData = data.replace(regex, "user: '" + newData + "'")
                await fs.writeFile(this.#path, tempData)

            }

        } else {
            data += "\r\nuser: '" + newData + "'"
            await fs.writeFile(this.#path, data)
        }


    }

    splitString(str, delimiter) {
        return str.split(delimiter)
    }


    async initCalendars(input) {
        if (existsSync(this.#path)) {
            let dataString = await this.findUser(input)

            let dataObject = JSON.parse(this.splitString(dataString, "'")[1])

           for (let i = 0; i < dataObject.calendar.length; i++) {
                this.createCalender(dataObject.calendar[i].type, dataObject.calendar[i].days, dataObject.calendar[i].title, dataObject.calendar[i].description)
            }            
        }

    }


}
export default Controller