import Calender from "./calender.js";
import Task from "./task.js"

class Factory {
    createCalenderFactory(type, days, title, description) {
        let c = new Calender(type, days, title, description)
        c.setDays(days)
        return c
           
            
    }

    createTaskFactory(title, description) {
        return new Task(title, description)
    }

}

export default Factory