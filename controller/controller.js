import Factory from "../models/factory.js"
import Task from "../models/task.js"


class Controller {
    #fac = new Factory()
    #calenders
    constructor() {
        this.#calenders = []
    }
    createCalender() {
        let c = this.#fac.createCalenderFactory()
        this.#calenders.push(c)
        return c
    }


    updateTask( task, title, description) {
        let oldT = task.getTitle()
        let oldD = task.getDescription()

        let newT = title
        let newD = description

        if (newT === '') {
            newT = oldT
        }
        if (newD === '') {
            newD = oldD
        }

        task.setTitle(newT)
        task.setDescription(newD)

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
        }else {
            throw new Error("Calender is not in the calender list")
        }
    }

    getCalenders() {
        return [...this.#calenders]
    }


    #findcalenderSearch(x) {
        // Look at binary search later
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

    


}





export default Controller

