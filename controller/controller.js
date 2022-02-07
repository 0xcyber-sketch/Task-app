import Factory from "../models/factory.js"
import Task from "../models/task.js"


class Controller {
    #fac = new Factory()
    #calenders
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

    addTaskToCalender(calender, title, description) {
        calender.addTask(new Task(title, description))
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

    


}
export default Controller