import Factory from "../models/factory.js"
import Task from "../models/task.js"
import fs from "fs/promises"
import { existsSync } from 'fs'
import Service from "../service/service.js"


class Controller {
    #service = new Service()
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
    /*
    async init() {

        if (!(existsSync(this.#dir))) {
            await fs.mkdir(this.#dir)
            await fs.writeFile(this.#path, "")
        }
    }
*/
    async findUser(inputUserName) {
        return this.#service.findUser(inputUserName, this.#dir)
 
    }

    async saveData(inputUserName, newData) {

        await this.#service.saveData(inputUserName, this.#dir, newData)

    }

    splitString(str, delimiter) {
        return str.split(delimiter)
    }


   async initCalendars(inputUserName,) {
        let dataObject = await this.#service.initCalendars(inputUserName, this.#dir)

        for (let i = 0; i < dataObject.calendar.length; i++) {
            this.createCalender(dataObject.calendar[i].type, dataObject.calendar[i].days, dataObject.calendar[i].title, dataObject.calendar[i].description)
        }


    }

    fileExsits(inputUserName) {
        return this.#service.fileExists(this.#service.makePath(inputUserName, this.#dir))
    }

    createFile(inputUserName, data) {
         this.#service.createFile(inputUserName, this.#dir, data)
    }

    async init() {
        let data = await this.#service.init(this.#dir)
        if (data !== "") {
            this.initCalendars(data)
            return data
        }
        return ""
    }


}
export default Controller