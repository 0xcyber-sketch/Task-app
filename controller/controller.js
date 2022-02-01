import Factory from "../models/factory.js"
import Task from "../models/task.js"


class Controller {
    #fac = new Factory()
    createCalender() {
        let c = this.#fac.createCalenderFactory()
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

    


}





export default Controller

