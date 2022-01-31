import Factory from "../models/factory.js"
import Task from "../models/task.js"


class Controller {
    #fac = new Factory()
    createCalender() {
        let c = this.#fac.createCalenderFactory()
        return c
    }

    createTask(title, description) {
        let t = this.#fac.createTaskFactory(title, description)
        return t
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

    addTaskForCalender(calender, task) {
        if (!(task instanceof Task)) throw new Error("Task is not a task object")
            calender.addTask(task)
    }

    


}





export default Controller

