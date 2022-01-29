import Calender from "./calender.js";


function calenderFactory() {
    this.create = () => {
        return new Calender()
    }
}

export default calenderFactory