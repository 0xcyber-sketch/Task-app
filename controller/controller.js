import Factory from "../models/factory.js"
import Task from "../models/task.js"
import Service from "../service/persistanceStorage.js"


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

    listTasksFromCalendar(calendar) {
        return calendar.getTasks();

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

    async findUser(inputUserName) {
        return this.#service.retrieveUser(inputUserName, this.#dir)

    }

    async saveData(inputUserName, newData) {

        await this.#service.saveDataToUser(inputUserName, this.#dir, newData)

    }

    splitString(str, delimiter) {
        return str.split(delimiter)
    }

 

    async initCalendars(inputUserName,) {
        let dataObject = await this.#service.initCalendarsAndTasks(inputUserName, this.#dir)
        console.log(dataObject.calendar.length);

        for (let i = 0; i < dataObject.calendar.length; i++) {
            let c = this.createCalender(dataObject.calendar[i].type, dataObject.calendar[i].days, dataObject.calendar[i].title, dataObject.calendar[i].description)
            c.setID(dataObject.calendar[i].id)
            c.setLastID(dataObject.calendar[i].id + 1)
            
        }
        if (dataObject.calendar.length === 0) {
            let temp = this.createCalender(" ", 2, " ", " ")
            temp.setLastID ( await this.openCalendarfile() + 1)
            this.deleteCalender(temp)
        }


    }

    async initTasks(inputUserName) {
        let dataObject = await this.#service.initCalendarsAndTasks(inputUserName, this.#dir)
        for (let i = 0; i < dataObject.calendar.length; i++) {

            let tempCalendar = this.getcalenderFromID(dataObject.calendar[i].id)
            for (let j = 0; j < dataObject.calendar[i].tasks.length; j++) {
                this.addTaskToCalender(tempCalendar, dataObject.calendar[i].tasks[j].title, dataObject.calendar[i].tasks[j].description, dataObject.calendar[i].tasks[j].days )
            }
            
        }

  
    }

    fileExsits(inputUserName) {
        return this.#service.userDataExist(this.#service.makePath(inputUserName, this.#dir))
    }

    createFile(inputUserName, data) {
        this.#service.createFile(inputUserName, this.#dir, data)
    }

    async init() {
        let data = await this.#service.init(this.#dir)

       
        if (!this.fileExsits(".task")){
            this.saveTotalExistingTasks("0");
        }
        if (!this.fileExsits(".calendar")){
            this.saveTotalExistingCalendars("0");
        }

        
        

        if (data !== "") {
            this.initCalendars(data)
            this.initTasks(data)
            return data
        }
        return ""
    }

    async saveTotalExistingTasks(data) {
        await this.#service.createFile(".task", this.#dir, data)
    }
    async saveTotalExistingCalendars(data) {
        await this.#service.createFile(".calendar", this.#dir, data)
    }

    async openTaskfile() {
        let tasks = await this.#service.openDataFile(this.#dir + ".task.txt")
        return parseInt(tasks);
    }

    async openCalendarfile() {
        let calendars = await this.#service.openDataFile(this.#dir + ".calendar.txt")
        return parseInt(calendars);
    }


}
export default Controller