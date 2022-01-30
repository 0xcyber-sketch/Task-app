import Calender from "./calender.js";
import Task from "./task.js"


function calenderFactory() {
    this.create = () => {
        return new Calender()
    }
}

function taskFactory() {
    this.create = (title, description) => {
        return new Task(title, description)
    }
}

export { calenderFactory, taskFactory}