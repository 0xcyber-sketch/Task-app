import Calender from "./calender.js";
import Task from "./task.js"

class Factory {
    createCalenderFactory() {
        return new Calender()
    }

    createTaskFactory(title, description) {
        return new Task(title, description)
    }

}

export default Factory