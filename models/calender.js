import task from "./task.js"

const  Calender = (() => {
    let lastID = 0
    return class Calender {

        #id
        #tasks

        constructor() {
            this.#id = lastID
            this.#tasks = []
            lastID++
        }

        getId() {
            return this.#id
        }

        getTasks() {
            return this.#tasks
        }

        addTask(task) {
            this.#tasks.push(task)
        }

        deleteTask(task) {
            let i = this.#findTaskSearch(task)
            if (i !== -1) {
                this.#tasks.splice(i, 1)
            }
        }

        findTask(task) {
            let i = this.#findTaskSearch(task)
            if (i !== -1) {
                return this.#tasks[i]
            }else {
                throw new Error("Task is not in the task list")
            }
        }

        #findTaskSearch(x) {
            // Look at binary search later
            let index = -1
            let i = 0
            while (index === -1 && i < this.#tasks.length) {
                if (this.#tasks[i].getId() === x.getId()) {
                    index = i
                } 
                else {
                    i++
                }
            }
            return index
        }

    }

})()

/*let  c1 = new Calender()

let t1 = new task("hej", "hej")

let t2 = new task("hejw", "hej")

c1.addTask(t1)
c1.addTask(t2)

let t4 = new task("hsh", "hhs")

let t3 = c1.findTask(t4)

console.log("ID: " + t3.getId());*/


export default Calender