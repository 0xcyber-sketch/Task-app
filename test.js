import Controller from "./controller/controller.js"


let con = new Controller()
let taskI = 0

let c1 = con.createCalender('pre', 13, "title", "description")
let c2 = con.createCalender('pre', 13, "title", "description")


con.addTaskToCalender(c1, "old", "old", 7)
console.log(c1.getTasks()[0].getId());


taskI++

con.addTaskToCalender(c2, "old", "old", 7)
console.log(c2.getTasks()[0].getId());

taskI++






