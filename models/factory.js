import Calender from "./calender.js";

class Factory {
    createCalenderFactory(type, days, title, description) {
        let c = new Calender(type, days, title, description)
        c.setDays(days)
        return c
           
            
    }
}

export default Factory